const router = require('express').Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');


router.post('/', async (req, res)=>{
    const convoId = req.body.convoId;
    if(!convoId){
        res.status(400).send({
            message: 'No convo id provided'
        });
    }
    else{
        //TODO: Check if it's double approved before retrieving
        const filePathResponse = await ConvosDatabase.getConvoFilePath(convoId);
        console.log(filePathResponse);
        if(filePathResponse.success){
            const filePath = filePathResponse.filePath;
            res.download(filePath);
        }
        else{
            res.status(500).send({
                message: filePathResponse.errorMessage
            });
        }        
    }
})

module.exports = router;