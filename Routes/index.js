const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send({
        message: "Basic route get"
    });
})

router.use('/convos', require('./Convos'));

module.exports = router;