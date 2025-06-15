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
