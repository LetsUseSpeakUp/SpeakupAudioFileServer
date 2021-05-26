const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("Don't use get for fileupload!");
})

router.post('/', (req, res)=>{
    try{
        if(!req.files){
            res.send({
                status: false,
                message: "Wtf! No file uploaded!"
            })
        }
        else{
            const convoFile = req.files.convoFile;
            //TODO: Also get metadata about the convo
            convoFile.mv('./uploads/' + convoFile.name);
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
        res.status(500).send(err);
    }
})

module.exports = router;