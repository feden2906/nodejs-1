const router = require('express').Router();
const { authController } = require('../controller');

router.post('/', authController.userLogin);

module.exports = router;
