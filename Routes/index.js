const router = require('express').Router();


router.use('/convos', require('./Convos'));
router.use('/tokens', require('./Tokens'))

module.exports = router;