const express = require('express');
const router = express.Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');
const ConvosFileManager = reqlib('/Logic/ConvosFileManager');

router.post('/', async (req, res) => {

    const convoMetaData = req.body.convoMetaData;
    const convoFile = req.files.convoFile;

    if (!convoMetaData) {
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
        const filePath = ConvosFileManager.convertIdToFilePath(convoFile.name)
        convoFile.mv(filePath);
        const uploadResponse = await ConvosDatabase.addConvo(filePath, convoMetaData);
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