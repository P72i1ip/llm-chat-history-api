/* eslint-disable no-unused-vars */
import { Conversation } from '../models/conversationModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// POST /api/v1/conversations
export const createConversation = catchAsync(
  async (req, res, next) => {
    const conversation = await Conversation.create({
      user: req.user._id, // 需登入，從 JWT 取得 user id
      messages: req.body.messages,
      tags: req.body.tags,
    });
    res.status(201).json({
      status: 'success',
      data: { conversation },
    });
  }
);

// GET /api/v1/conversations
export const getAllConversations = catchAsync(
  async (req, res, next) => {
    const filter = { user: req.user._id };

    // Tag filter
    if (req.query.tags) {
      const tags = req.query.tags.split(',');
      filter.tags = { $all: tags };
    }

    // createdAt filter (only if createdOnly is true)
    if (
      req.query.createdOnly === 'true' &&
      (req.query.from || req.query.to)
    ) {
      filter.createdAt = {};
      if (req.query.from)
        filter.createdAt.$gte = new Date(req.query.from);
      if (req.query.to)
        filter.createdAt.$lte = new Date(req.query.to);
    }

    // default message.timestamp filter
    if (
      (!req.query.createdOnly ||
        req.query.createdOnly !== 'true') &&
      (req.query.from || req.query.to)
    ) {
      filter.messages = {
        $elemMatch: {
          timestamp: {
            ...(req.query.from && {
              $gte: new Date(req.query.from),
            }),
            ...(req.query.to && {
              $lte: new Date(req.query.to),
            }),
          },
        },
      };
    }

    // keyword search（messages.content）
    if (req.query.keyword) {
      filter['messages.content'] = {
        $regex: req.query.keyword,
        $options: 'i',
      };
    }

    const conversations = await Conversation.find(filter);

    // filter messages by timestamp if createdOnly is false
    if (
      (!req.query.createdOnly ||
        req.query.createdOnly !== 'true') &&
      (req.query.from || req.query.to)
    ) {
      const from = req.query.from
        ? new Date(req.query.from)
        : null;
      const to = req.query.to
        ? new Date(req.query.to)
        : null;

      conversations.forEach((conv) => {
        conv.messages = conv.messages.filter((msg) => {
          const t = new Date(msg.timestamp);
          return (!from || t >= from) && (!to || t <= to);
        });
      });
    }

    // filter messages by keyword if provided
    if (req.query.keyword) {
      const regex = new RegExp(req.query.keyword, 'i');
      conversations.forEach((conv) => {
        conv.messages = conv.messages.filter((msg) =>
          regex.test(msg.content)
        );
      });
    }

    res.status(200).json({
      status: 'success',
      results: conversations.length,
      data: { conversations },
    });
  }
);

// GET /api/v1/conversations/:id
export const getConversation = catchAsync(
  async (req, res, next) => {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!conversation)
      return next(
        new AppError('No conversation found', 404)
      );
    res.status(200).json({
      status: 'success',
      data: { conversation },
    });
  }
);

// PATCH /api/v1/conversations/:id
export const updateConversation = catchAsync(
  async (req, res, next) => {
    const conversation =
      await Conversation.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true, runValidators: true }
      );
    if (!conversation)
      return next(
        new AppError('No conversation found', 404)
      );
    res.status(200).json({
      status: 'success',
      data: { conversation },
    });
  }
);

// PATCH /api/v1/conversations/:id
export const appendMessage = catchAsync(
  async (req, res, next) => {
    const newMessage = req.body.message; // 應該是一個物件 {role, content, ...}

    const conversation =
      await Conversation.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { $push: { messages: newMessage } }, // 用 $push 追加
        { new: true, runValidators: true }
      );

    if (!conversation)
      return next(
        new AppError('No conversation found', 404)
      );

    res.status(200).json({
      status: 'success',
      data: { conversation },
    });
  }
);

// DELETE /api/v1/conversations/:id
export const deleteConversation = catchAsync(
  async (req, res, next) => {
    const conversation =
      await Conversation.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
    if (!conversation)
      return next(
        new AppError('No conversation found', 404)
      );
    res.status(204).json({ status: 'success', data: null });
  }
);
