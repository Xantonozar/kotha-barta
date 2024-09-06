const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const {sendMessage , allMessages} = require('../controllers/MessageController');
const { protect } = require('../middleware/authMiddleWare');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.route('/').post(protect, sendMessage);
router.route('/:chatID').get(protect, allMessages);

module.exports = router;