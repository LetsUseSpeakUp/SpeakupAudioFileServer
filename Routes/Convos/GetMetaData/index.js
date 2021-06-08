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

    const metadataResponse = await ConvosDatabase.getAllConvosMetaDataForUser(phoneNumber);
    if (metadataResponse.success) {
        return res.status(200).send({
            metadataAsInitiator: metadataResponse.metadataAsInitiator,
            metadataAsReceiver: metadataResponse.metadataAsReceiver
        });
    }
    return res.status(500).send({
        message: metadataResponse.errorMessage
    });
})

router.post('/singleconvo', async(req, res)=>{
    const phoneNumber = req.user['https://backend.letsusespeakup.com/token/usermetadata/phone_number'] 
        || req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].phone_number;
        
    if (!phoneNumber) {
        return res.status(400).send({
            message: 'phone number not set'
        });
    }

    const convoId = req.body.convoId;
    if(!convoId){
        return res.status(400).send({
            message: 'convoID not set'
        })
    };

    const metadataResponse = await ConvosDatabase.getSingleConvoMetadata(convoId);
    if(metadataResponse.success){
        console.log("/Convos/getmetadata/singleconvo. phone number: ", phoneNumber, " metadata response: ", metadataResponse);
        if(phoneNumber !== metadataResponse.initiator_number && phoneNumber !== metadataResponse.receiver_number){
            return res.status(500).send({
                message: 'invalid phone number'
            });
        }
        return res.status(200).send({
            id: metadataResponse.id,
            initiator_number: metadataResponse.initiator_number,            
            initiator_first_name: metadataResponse.initiator_first_name,
            initiator_last_name: metadataResponse.initiator_last_name,
            receiver_number: metadataResponse.receiver_number,
            receiver_first_name: metadataResponse.receiver_first_name,
            receiver_last_name: metadataResponse.receiver_last_name,
            timestamp_of_start: metadataResponse.timestamp_of_start,
            length: metadataResponse.length,
            initiator_approval: metadataResponse.initiator_approval,
            receiver_approval: metadataResponse.receiver_approval,
            is_completed: metadataResponse.is_completed
        })
    }
    return res.status(500).send({
        message: metadataResponse.errorMessage
    });    
});

module.exports = router;