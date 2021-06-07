const router = require('express').Router();


router.use('/convos', require('./Convos'));
router.use('/users', require('./Users'));
router.use('/tokens', require('./Tokens'))

module.exports = router;