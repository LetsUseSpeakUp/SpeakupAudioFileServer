const express = require('express');
const router = express.Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');
const ConvosFileManager = reqlib('/Logic/ConvosFileManager');

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

    const metadata = JSON.parse(convoMetadata);
    if(metadata.initiatorPhoneNumber !== phoneNumber && metadata.receiverPhoneNumber !== phoneNumber){
        return res.status(500).send({
            message: 'invalid phone number'
        });
    }

    const filePath = ConvosFileManager.convertIdToFilePath(metadata.convoId)
    convoFile.mv(filePath);
    const uploadResponse = await ConvosDatabase.addConvo(filePath, convoMetadata);
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