const router = require('express').Router();
const {
    handleExceptions
} = require('../middlewares/errorHandlers');

router.post('/login', handleExceptions(require('../controllers/login').login));
router.post('/signup', handleExceptions(require('../controllers/login').signUp));

module.exports = router;