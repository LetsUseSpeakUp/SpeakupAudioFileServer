const router = require('express').Router();

router.use('/snippets', require('./Snippets'));

module.exports = router;