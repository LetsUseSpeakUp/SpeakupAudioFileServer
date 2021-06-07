const router = require('express').Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');


router.get('/', async (req, res) => {
    const convoId = req.query.convoId;

    if (!convoId) {
        return res.status(400).send({
            message: 'No convo id provided'
        });
    }

    //TODO: Get Full Convo Info. 500 if auth token says you are not initiator or receiver
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