const router = require('express').Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');

router.post('/', async (req, res) => {
    const convoId = req.body.convoId;
    const phoneNumber = req.user['https://backend.letsusespeakup.com/token/usermetadata/phone_number'] 
        || req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].phone_number;

    if (!convoId) {
        return res.status(400).send({
            message: 'No convo id set'
        });
    }    

    const getApprovalResponse = await ConvosDatabase.getConvoApprovalInfo(convoId);
    if(getApprovalResponse.initiatorNumber !== phoneNumber && getApprovalResponse.receiverNumber !== phoneNumber){
        return res.status(500).send({
            message: 'invalid phone number'
        });
    }

    if (getApprovalResponse.success) {
        return res.send({
            initiatorApproval: getApprovalResponse.initiatorApproval,
            receiverApproval: getApprovalResponse.receiverApproval
        });
    }
    return res.status(500).send({
        message: getApprovalResponse.errorMessage
    });

})

module.exports = router;