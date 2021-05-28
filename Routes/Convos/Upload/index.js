const express = require('express');
const router = express.Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');
const ConvosFileManager = reqlib('/Logic/ConvosFileManager');

router.post('/', async (req, res) => {

    const convoMetadata = req.body.convoMetadata;
    const convoFile = req.files.convoFile;

    if (!convoMetadata) {
        res.status(400).send({
            message: "No convometadata included"
        });
    }
    else if (!convoFile) {
        res.status(400).send({
            message: "No convoFile included"
        });
    }
    else {
        const metadata = JSON.parse(convoMetadata);

        const filePath = ConvosFileManager.convertIdToFilePath(metadata.convoId)        
        convoFile.mv(filePath);
        const uploadResponse = await ConvosDatabase.addConvo(filePath, convoMetadata);
        if(uploadResponse.success){
            res.send({
                message: 'successfully uploaded'
            });
        }
        else{
            res.status(500).send({
                message: uploadResponse.errorMessage
            });
        }
    }
})

module.exports = router;