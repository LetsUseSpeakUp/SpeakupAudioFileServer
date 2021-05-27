const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send({
        message: "Don't use GET for file upload!"
    });
})

router.post('/', (req, res)=>{
    console.log("Post request made to /audioUpload. Files: ", req.files,
    " Body: ", req.body);    
    try{
        if(!req.files){
            res.send({
                status: false,
                message: "Wtf! No file uploaded!"
            })
        }
        else{
            console.log("Convo meta data: ", req.body.convoMetaData);
            console.log("Files uploaded. Files: ", req.files);
            const convoFile = req.files.convoFile;
            

            convoFile.mv('./uploads/' + convoFile.name);
            console.log("Uploader: ", req.body.uploader);
            res.send({
                status: true,
                message: 'File uploaded',
                data: {
                    name: convoFile.name,
                    mimetype: convoFile.mimetype,
                    size: convoFile.size
                }
            })
        }
    }
    catch(err){
        console.log("ERROR: ", err);
        res.status(500).send(err);
    }
})

module.exports = router;