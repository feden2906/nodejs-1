const router = require('express').Router();
const { authController } = require('../controller');
const { authMiddleware } = require('../middlewares');

router.post('/', authMiddleware, authController.userLogin);

module.exports = router;
