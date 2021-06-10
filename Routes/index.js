const router = require('express').Router();
const Authentication = require('../Authentication');


router.use('/needauth', Authentication.checkJwt, require('./NeedAuth'));
router.use('/open', require('./Open'));

module.exports = router;