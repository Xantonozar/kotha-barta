const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const { protect } = require('../middleware/authMiddleWare');

const { accessChat , fetchChats , createGroupChat ,renameGroup , addToGroup , removeFromGroup }= require('../controllers/ChatController');
const router = express.Router();
router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/groupremove').put(protect, removeFromGroup);
router.route('/groupadd').put(protect, addToGroup);
module.exports = router;