const router = require('express').Router();

router.get('/allforuser', (req, res)=>{
    const phoneNumber = req.query.phoneNumber;
    if(!phoneNumber){
        res.status(400).send({
            message: 'phone number not set'
        });
    }
    else{
        //TODO: Get metadata from DB
        const metaData = "dummyMetaData";
        res.send({
            metaData: metaData
        });
    }
})

module.exports = router;