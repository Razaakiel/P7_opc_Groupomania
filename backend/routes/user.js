const express       = require("express");
const router        = express.Router();
const userCtrl      = require("../controllers/user");
const auth          = require('../middleware/auth');

// Routes pour les utilisateurs
router.get('/users/:id', auth, userCtrl.getOneUser);
router.put('/users/:id', auth, userCtrl.modifyUser);
router.delete('/users/:id', auth, userCtrl.deleteUser);

// Routes pour les admins
router.get('/admin/users/:id', auth, userCtrl.getAllUsersByAdmin);
router.put('/admin/users/:id', auth, userCtrl.modifyUserRole);

module.exports = router