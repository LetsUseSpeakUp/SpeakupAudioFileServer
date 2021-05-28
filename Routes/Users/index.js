const router = require('express').Router();

router.use('/create', require('./Create'));
router.use('/query', require('./Query'));

module.exports = router;