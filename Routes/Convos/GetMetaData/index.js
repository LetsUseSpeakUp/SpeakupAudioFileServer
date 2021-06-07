const router = require('express').Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');

router.post('/allforuser', async (req, res) => {    
    const phoneNumber = req.user['https://backend.letsusespeakup.com/token/usermetadata/phone_number'] 
        || req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].phone_number;
        
    if (!phoneNumber) {
        return res.status(400).send({
            message: 'phone number not set'
        });
    }

    const metaDataResponse = await ConvosDatabase.getAllConvosMetaDataForUser(phoneNumber);
    if (metaDataResponse.success) {
        return res.status(200).send({
            metadataAsInitiator: metaDataResponse.metadataAsInitiator,
            metadataAsReceiver: metaDataResponse.metadataAsReceiver
        });
    }
    return res.status(500).send({
        message: metaDataResponse.errorMessage
    });

})

module.exports = router;