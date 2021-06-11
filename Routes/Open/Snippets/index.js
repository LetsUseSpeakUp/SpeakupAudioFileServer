const router = require('express').Router();
const ConvosFileManager = require('../../../Logic/ConvosFileManager');
const ConvosDatabase = require('../../../Logic/Database/ConvosDatabase');
const SnippetsDatabase = require('../../../Logic/Database/SnippetsDatabase');
const Encryption = require('../../../Logic/Encryption')
const fs = require('fs');
const querystring = require('querystring');

router.get('/', async (req, res) => {  
    const encrypted = req.query.val;
    if(!encrypted){
        return res.status(400).send({
            message: 'no query'
        })
    }
    const decrypted = Encryption.getDecryptedString(encrypted);
    const parsedQuery = querystring.parse(decrypted);
        
    const convoId = parsedQuery['convoId'];
    const snippetStart = parsedQuery['snippetStart'];
    const snippetEnd = parsedQuery['snippetEnd'];
    
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

    const isValidSnippet = await SnippetsDatabase.doesSnippetExistInDB(convoId, snippetStart, snippetEnd);
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
        res.set('content-type', 'video/mp4');
        res.set('accept-ranges', 'bytes');
        const stats = fs.statSync(filePath);
        res.set('content-length', stats.size);
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

router.get('/mp4Preview',  async (req, res)=>{
    const encrypted = req.query.val;
    if(!encrypted){
        return res.status(400).send({
            message: 'no query'
        })
    }
    const decrypted = Encryption.getDecryptedString(encrypted);
    const parsedQuery = querystring.parse(decrypted);
        
    const convoId = parsedQuery['convoId'];
    const snippetStart = parsedQuery['snippetStart'];
    const snippetEnd = parsedQuery['snippetEnd'];
    
    
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

    const isValidSnippet = await SnippetsDatabase.doesSnippetExistInDB(convoId, snippetStart, snippetEnd);
    if(!isValidSnippet){
        return res.status(500).send({
            message: 'invalid snippet'
        });
    }

    let filePath = ''
    try{
        filePath = ConvosFileManager.getSnippetRichPreviewMp4(convoId, snippetStart, snippetEnd);        
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
    else{
        return res.status(500).send({
            message: 'error getting snippet (2)'
        });
    }  
})

module.exports = router;