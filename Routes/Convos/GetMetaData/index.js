const router = require('express').Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');

router.get('/allforuser', (req, res)=>{
    const phoneNumber = req.query.phoneNumber;
    if(!phoneNumber){
        res.status(400).send({
            message: 'phone number not set'
        });
    }
    else{
        const metaDataResponse = await ConvosDatabase.getAllConvosMetaDataForUser(phoneNumber);
        if(metaDataResponse.success){            
            res.send({
                metaData: metaDataResponse.metaData
            });
        }
        else{            
            res.status(500).send({
                message: metaDataResponse.errorMessage
            });
        }
    }
})

module.exports = router;