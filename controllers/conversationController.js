import { Conversation } from '../models/conversationModel.js';
import catchAsync from '../utils/catchAsync.js';

// Create a new conversation
export const createConversation = catchAsync(
  async (req, res) => {
    const conversation = await Conversation.create(
      req.body
    );
    res
      .status(201)
      .json({ status: 'success', data: conversation });
  }
);

// Get all conversations
export const getAllConversations = catchAsync(
  async (req, res) => {
    const conversations = await Conversation.find();
    res.status(200).json({
      status: 'success',
      results: conversations.length,
      data: conversations,
    });
  }
);

// Get a single conversation by ID
export const getConversation = catchAsync(
  async (req, res) => {
    const conversation = await Conversation.findById(
      req.params.id
    );
    if (!conversation) {
      return res.status(404).json({
        status: 'fail',
        message: 'Conversation not found',
      });
    }
    res
      .status(200)
      .json({ status: 'success', data: conversation });
  }
);

// Update a conversation by ID
export const updateConversation = catchAsync(
  async (req, res) => {
    const conversation =
      await Conversation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    if (!conversation) {
      return res.status(404).json({
        status: 'fail',
        message: 'Conversation not found',
      });
    }
    res
      .status(200)
      .json({ status: 'success', data: conversation });
  }
);

// Delete a conversation by ID
export const deleteConversation = catchAsync(
  async (req, res) => {
    const conversation =
      await Conversation.findByIdAndDelete(req.params.id);
    if (!conversation) {
      return res.status(404).json({
        status: 'fail',
        message: 'Conversation not found',
      });
    }
    res.status(204).json({ status: 'success', data: null });
  }
);
