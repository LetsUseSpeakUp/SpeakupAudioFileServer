const express = require('express');
const router = express.Router();

router.post('/', (req, res)=>{
    console.log("Post request made to /convos/upload. Files: ", req.files,
    " Body: ", req.body);    
    try{
        if(!req.files){ //TODO: if no metadata, error
            res.send({
                status: false,
                message: "No file uploaded"
            })
        }
        else{
            //TODO: Write to do DB
            //TODO: Write to proper file locatin
            console.log("Convo meta data: ", req.body.convoMetaData);
            console.log("Files uploaded. Files: ", req.files);
            const convoFile = req.files.convoFile;
            

            convoFile.mv('./Uploaded_Convos/' + convoFile.name);            
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