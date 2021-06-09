const express = require('express');
const router = express.Router();
const ConvosDatabase = require('../../../../Logic/Database/ConvosDatabase')
const ConvosFileManager = require('../../../../Logic/ConvosFileManager')

router.post('/', async (req, res) => {

    const convoMetadata = req.body.convoMetadata;
    const convoFile = req.files.convoFile;
    const phoneNumber = req.user['https://backend.letsusespeakup.com/token/usermetadata/phone_number'] 
        || req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].phone_number;

    if (!convoMetadata) {
        return res.status(400).send({
            message: "No convometadata included"
        });
    }

    if (!convoFile) {
        return res.status(400).send({
            message: "No convoFile included"
        });
    }
    
    const metadata = ConvosDatabase.convertConvoMetadataFromClientToServerFormat(JSON.parse(convoMetadata));
    console.log("/Convos/Upload. initiator 1: ", metadata.initiatorPhoneNumber, " metadata: ", metadata);
    if((metadata.initiatorPhoneNumber !== phoneNumber) && (metadata.receiverPhoneNumber !== phoneNumber)){
        return res.status(500).send({
            message: 'invalid phone number 1'
        });
    }

    const getApprovalResponse = await ConvosDatabase.getConvoApprovalInfo(metadata.convoId);
    if(getApprovalResponse.initiatorNumber !== phoneNumber && getApprovalResponse.receiverNumber !== phoneNumber){
        return res.status(500).send({
            message: 'invalid phone number 2'
        });
    }

    const filePath = ConvosFileManager.convertIdToFilePath(metadata.convoId)
    convoFile.mv(filePath);
    const uploadResponse = await ConvosDatabase.finalizeConvo(filePath, convoMetadata);
    if (uploadResponse.success) {
        return res.send({
            message: 'successfully uploaded'
        });
    }

    return res.status(500).send({
        message: uploadResponse.errorMessage
    });
})

module.exports = router;