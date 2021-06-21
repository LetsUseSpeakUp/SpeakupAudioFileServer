const express = require('express');
const router = express.Router();

router.use('/convos', require('./Convos'));
router.use('/tokens', require('./Tokens'));
router.use('/users', require('./Users'));

module.exports = router;