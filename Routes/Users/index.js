const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send({
        message: '/users base get'
    });
})

router.use('/create', require('./Create'));
router.use('/query', require('./Query'));

module.exports = router;