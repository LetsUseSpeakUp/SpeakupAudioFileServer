const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send({
        message: "basic convos get"
    });
})

router.use('/upload', require('./Upload'));
router.use('/getmetadata', require('./GetMetaData'));
router.use('/setapproval', require('./SetApproval'));
router.use('/retrieve', require('./Retrieve'));

module.exports = router;