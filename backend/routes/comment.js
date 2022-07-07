const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require('../middleware/auth');

// Routes pour les commentaires
router.post('/:postId/comments', auth, commentCtrl.createComment);
router.get('/:postId/comments', auth, commentCtrl.getCommentsByPostId);
router.get('/:postId/comments/:id', auth, commentCtrl.getOneComment);
router.put('/:postId/comments/:id', auth, commentCtrl.modifyComment);
router.delete('/:postId/comments/:id', auth, commentCtrl.deleteComment);
router.delete('/admin/:postId/comments/:id', auth, commentCtrl.deleteCommentByAdmin);
module.exports = router