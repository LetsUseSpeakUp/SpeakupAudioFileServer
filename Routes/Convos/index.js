const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send({
        message: "basic convos get"
    });
})

router.use('/upload', require('./Upload'));
router.use('/getmetadata', require('./GetMetaData'));

module.exports = router;