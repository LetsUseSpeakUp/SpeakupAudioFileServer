const router = require('express').Router();
const ConvosDatabase = require('../../../../Logic/Database/ConvosDatabase')

router.post('/', async (req, res) => {
    const convoId = req.body.convoId;
    const phoneNumber = req.user['https://backend.letsusespeakup.com/token/usermetadata/phone_number'] 
        || req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].phone_number;
    const approval = req.body.approval;

    if (!convoId) {
        return res.status(400).send({
            message: 'No convo id set'
        });
    }

    if (!phoneNumber) {
        return res.status(400).send({
            message: 'No phone number set'
        });
    }

    if (!approval) {
        return res.status(400).send({
            message: 'No approval set'
        });
    }


    const setApprovalResponse = await ConvosDatabase.setConvoApproval(convoId, phoneNumber, approval);
    if (setApprovalResponse.success) {
        return res.send({
            message: `Successfully approved (or updated nothing if a param didn't match)`
        });
    }

    return res.status(500).send({
        message: setApprovalResponse.errorMessage
    });


})

module.exports = router;