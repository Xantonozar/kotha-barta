const express = require('express');
const { registerUser } = require('../controllers/UserControllers');
const { authUser } = require('../controllers/UserControllers');
const { allUsers } = require('../controllers/UserControllers');
const { protect } = require('../middleware/authMiddleWare');
const router = express.Router();
router.route('/').post(registerUser).get(protect , allUsers)
router.post('/login',authUser);
module.exports = router;