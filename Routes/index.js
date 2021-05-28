const router = require('express').Router();


router.use('/convos', require('./Convos'));
router.use('/users', require('./Users'));

module.exports = router;