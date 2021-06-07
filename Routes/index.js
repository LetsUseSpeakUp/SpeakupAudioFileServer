const router = require('express').Router();


router.use('/convos', require('./Convos'));
router.use('/users', require('./Users'));
router.use('/token', require('./Tokens'))

module.exports = router;