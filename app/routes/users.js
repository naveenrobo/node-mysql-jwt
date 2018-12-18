const router = require('express').Router();
const validate = require('express-validation');
const {
    handleExceptions
} = require('../middlewares/errorHandlers');
const validator = require('./validation/users');

router.post('/login', handleExceptions(require('../controllers/login').login));
router.post('/signup', handleExceptions(require('../controllers/login').signUp));

module.exports = router;