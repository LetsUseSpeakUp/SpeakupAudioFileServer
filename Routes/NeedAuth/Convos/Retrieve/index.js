const router = require('express').Router();
const ConvosDatabase = require('../../../../Logic/Database/ConvosDatabase')


router.get('/', async (req, res) => {    
    const convoId = req.query.convoId;
    const phoneNumber = req.user['https://backend.letsusespeakup.com/token/usermetadata/phone_number'] 
        || req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].phone_number;

    if (!convoId) {
        return res.status(400).send({
            message: 'No convo id provided'
        });
    }
        
    const approvalResponse = await ConvosDatabase.getConvoApprovalInfo(convoId);
    if (!approvalResponse.success) {
        return res.status(500).send({
            message: approvalResponse.errorMessage
        });
    }

    if (approvalResponse.initiatorApproval != 1) {
        return res.status(500).send({
            message: "initiator didn't approve"
        });
    }
    if (approvalResponse.receiverApproval != 1) {
        return res.status(500).send({
            message: "receiver didn't approve"
        });
    }

    if(approvalResponse.initiatorNumber !== phoneNumber && approvalResponse.receiverNumber !== phoneNumber){
        return res.status(500).send({
            message: 'invalid phone number'
        });
    }

    const filePathResponse = await ConvosDatabase.getConvoFilePath(convoId);
    console.log(filePathResponse);
    if (filePathResponse.success) {
        const filePath = filePathResponse.filePath;
        return res.download(filePath);
    }

    return res.status(500).send({
        message: filePathResponse.errorMessage
    });

})

module.exports = router;