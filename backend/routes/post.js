const express       = require("express");
const router        = express.Router();
const multer        = require("../middleware/multer-config");
const auth          = require('../middleware/auth');
const messageCtrl   = require("../controllers/post");

router.post("/", auth, multer, messageCtrl.createMessage);
router.get("/all/:id", auth, messageCtrl.findAllMessagesForOne);
router.get("/:id", auth, messageCtrl.findOneMessage);
router.get("/", messageCtrl.findAllMessages);
router.delete("/admin/:id",auth, messageCtrl.deleteMessage);
router.put('/:id', auth, messageCtrl.modifyPost);

module.exports = router;