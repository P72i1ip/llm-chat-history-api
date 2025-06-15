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
    const conversations = await Conversation.find({
      user: req.user._id,
    });
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
export const appendMessage = catchAsync(async (req, res, next) => {
  const newMessage = req.body.message; // 應該是一個物件 {role, content, ...}

  const conversation = await Conversation.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $push: { messages: newMessage } }, // 用 $push 追加
    { new: true, runValidators: true }
  );

  if (!conversation) return next(new AppError('No conversation found', 404));

  res.status(200).json({
    status: 'success',
    data: { conversation },
  });
});

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
