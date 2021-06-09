const router = require('express').Router();
const ConvoDatabase = require('../../Logic/Database/ConvosDatabase')


router.get('/', async (req, res) => {    
    const convoId = req.query.convoId;
    const snippetStart = req.query.snippetStart;
    const snippetEnd = req.query.snippetEnd;
    
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
    //TODO: Turn this into a snippet
    /*if (filePathResponse.success) {
        const filePath = filePathResponse.filePath;
        return res.download(filePath);
    }

    return res.status(500).send({
        message: filePathResponse.errorMessage
    }); */
})

module.exports = router;