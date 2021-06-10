const router = require('express').Router();
const ConvosFileManager = require('../../../Logic/ConvosFileManager');
const ConvosDatabase = require('../../../Logic/Database/ConvosDatabase');
const SnippetsDatabase = require('../../../Logic/Database/SnippetsDatabase');
const fs = require('fs');

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

    const isValidSnippet = await SnippetsDatabase.doesSnippetExistInDb(convoId, snippetStart, snippetEnd);
    if(!isValidSnippet){
        return res.status(500).send({
            message: 'invalid snippet'
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
        res.set('content-type', 'audio/mp3');
        res.set('accept-ranges', 'bytes');
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('data', (chunk)=>{
            console.log("/Snippets. read data");
            res.write(chunk);
        })
        fileStream.on('error', (error)=>{
            console.log("ERROR -- /Snippets: ", error);
            res.status(500).send({                
                message: 'error sending stream'
            });
        })
        fileStream.on('end', ()=>{
            res.end();
        })

    }
    else{
        return res.status(500).send({
            message: 'error getting snippet (2)'
        });
    }
    
})

module.exports = router;