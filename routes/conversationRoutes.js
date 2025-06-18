/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Conversation management and chat history
 */

/**
 * @swagger
 * /api/v1/conversations:
 *   get:
 *     summary: Get all conversations for the current user
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Filter by tags (comma separated)
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start timestamp (filter messages or conversations)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End timestamp (filter messages or conversations)
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword search in messages
 *       - in: query
 *         name: createdOnly
 *         schema:
 *           type: boolean
 *         description: If true, filter by conversation createdAt only
 *     responses:
 *       200:
 *         description: List of conversations
 *   post:
 *     summary: Create a new conversation
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant]
 *                     content:
 *                       type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Conversation created
 */

/**
 * @swagger
 * /api/v1/conversations/{id}:
 *   get:
 *     summary: Get a conversation by ID
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: Conversation details
 *   patch:
 *     summary: Update a conversation by ID
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Conversation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant]
 *                     content:
 *                       type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Conversation updated
 *   delete:
 *     summary: Delete a conversation by ID
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Conversation ID
 *     responses:
 *       204:
 *         description: Conversation deleted
 */

/**
 * @swagger
 * /api/v1/conversations/{id}/messages:
 *   post:
 *     summary: Append a new message to a conversation
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Conversation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: object
 *                 properties:
 *                   role:
 *                     type: string
 *                     enum: [user, assistant]
 *                   content:
 *                     type: string
 *     responses:
 *       200:
 *         description: Message appended to conversation
 */

import express from 'express';
import * as conversationController from '../controllers/conversationController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.use(protect); // 所有路由都需登入

router
  .route('/')
  .get(conversationController.getAllConversations)
  .post(conversationController.createConversation);

router
  .route('/:id')
  .get(conversationController.getConversation)
  .patch(conversationController.updateConversation)
  .delete(conversationController.deleteConversation);

router.post(
  '/:id/messages',
  conversationController.appendMessage
);

export default router;
