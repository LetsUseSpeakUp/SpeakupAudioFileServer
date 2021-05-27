const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send({
        message: "Basic route get"
    });
})

router.use('/convos', require('./Convos'));
router.use('/users', require('./Users'));

module.exports = router;