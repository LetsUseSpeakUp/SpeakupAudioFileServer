const router = require('express').Router();
const ConvosFileManager = require('../../../Logic/ConvosFileManager');
const ConvosDatabase = require('../../../Logic/Database/ConvosDatabase');

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

    let filePath = ''
    try{
        filePath = ConvosFileManager.getSnippet(convoId, snippetStart, snippetEnd);        
    }
    catch(error){
        console.log("ERROR -- Snippets: ", error);
        return res.status(500).send({
            message: 'error getting snippet'
        });
    }
    
    if (filePath.length > 0) {        
        return res.download(filePath);
    }

    return res.status(500).send({
        message: 'error getting snippet (2)'
    });
})

module.exports = router;