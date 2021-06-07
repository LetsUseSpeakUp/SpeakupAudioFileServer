const router = require('express').Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');

router.post('/', async (req, res) => {
    const convoId = req.body.convoId;

    if (!convoId) {
        return res.status(400).send({
            message: 'No convo id set'
        });
    }

    //TODO: 500 if auth token doesn't say you are initiator or receiver

    const getApprovalResponse = await ConvosDatabase.getConvoApprovalInfo(convoId);
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