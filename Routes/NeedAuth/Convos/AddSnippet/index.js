const router = require('express').Router();
const SnippetsDatabase = require('../../../../Logic/Database/SnippetsDatabase');
const ConvosDatabase = require('../../../../Logic/Database/ConvosDatabase');
const ConvosFileManager = require('../../../../Logic/ConvosFileManager');
const Encryption = require('../../../../Logic/Encryption');

router.post('/', async (req, res) => {
    const convoId = req.body.convoId;
    const snippetStart = req.body.snippetStart;
    const snippetEnd = req.body.snippetEnd;
    const snippetDescription = req.body.snippetDescription ?? '';

    const phoneNumber = req.user['https://backend.letsusespeakup.com/token/usermetadata/phone_number']
        || req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].phone_number;

    if (!convoId) {
        return res.status(400).send({
            message: 'No convo id provided'
        });
    }

    if (!snippetStart) {
        return res.status(400).send({
            message: 'No start provided'
        });
    }

    if (!snippetEnd) {
        return res.status(400).send({
            message: 'No end provided'
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

    if (phoneNumber !== approvalResponse.initiatorNumber && phoneNumber !== approvalResponse.receiverNumber) {
        return res.status(500).send({
            message: 'invalid phone number'
        });
    }

    const addSnippetResponse = await SnippetsDatabase.addSnippet(convoId, snippetStart, snippetEnd);
    const createSnippetResponse = await ConvosFileManager.createSnippet(convoId, snippetStart, snippetEnd);
    const unencryptedQuery = "convoId=" + convoId + "&snippetStart=" + snippetStart + "&snippetEnd=" + snippetEnd + '&snippetDescription=' + snippetDescription;    
    const encryptedQuery = Encryption.getEncryptedString(unencryptedQuery);
    const snippetLink = 'https://letsusespeakup.com/playsnippet?val=' + encryptedQuery;

    if (!addSnippetResponse.success) {
        return res.status(500).send({
            message: addSnippetResponse.errorMessage
        });
    }
    if (!createSnippetResponse.success) {
        return res.status(500).send({
            message: createSnippetResponse.errorMessage
        });
    }

    return res.status(200).send({
        snippetLink: snippetLink
    });
})

module.exports = router;