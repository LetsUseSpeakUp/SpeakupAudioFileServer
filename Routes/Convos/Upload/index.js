const express = require('express');
const router = express.Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');
const ConvosFileManager = reqlib('/Logic/ConvosFileManager');

router.post('/', async (req, res) => {

    const convoMetadata = req.body.convoMetadata;
    const convoFile = req.files.convoFile;

    //TODO: Confirm phone number from auth token is initiator or receiver in metadata. 500 if not

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