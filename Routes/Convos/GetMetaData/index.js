const router = require('express').Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');

router.post('/allforuser', async (req, res)=>{
    const phoneNumber = req.body.phoneNumber;
    if(!phoneNumber){
        res.status(400).send({
            message: 'phone number not set'
        });
        return;
    }
    else{
        const metaDataResponse = await ConvosDatabase.getAllConvosMetaDataForUser(phoneNumber);
        if(metaDataResponse.success){            
            res.send({
                metadataAsInitiator: metaDataResponse.metadataAsInitiator,
                metadataAsReceiver: metaDataResponse.metadataAsReceiver
            });
            return;
        }
        else{            
            res.status(500).send({
                message: metaDataResponse.errorMessage
            });
            return;
        }
    }
})

module.exports = router;