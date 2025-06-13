import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [
      true,
      'A conversation must belong to a user',
    ],
  },
  messages: [
    {
      role: {
        type: String,
        enum: ['user', 'assistant'],
        required: [true, 'Message role is required'],
      },
      content: {
        type: String,
        required: [true, 'Message content is required'],
        minlength: [1, 'Message content cannot be empty'],
        maxlength: [2000, 'Message content is too long'],
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  tags: {
    type: [String],
    enum: ['important', 'work', 'personal', 'archive'],
    default: [],
    validate: {
      validator: function (arr) {
        // 限制標籤數量最多 5 個
        return arr.length <= 5;
      },
      message: 'You can assign up to 5 tags only.',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: { type: Date, default: Date.now },
});

export const Conversation = mongoose.model(
  'Conversation',
  conversationSchema
);
