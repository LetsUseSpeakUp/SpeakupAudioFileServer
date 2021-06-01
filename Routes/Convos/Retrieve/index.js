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
        const approvalResponse = await ConvosDatabase.getConvoApprovalInfo(convoId); 
        if(!approvalResponse.success){
            res.status(500).send({
                message: approvalResponse.errorMessage
            });
            return;
        }
        if(approvalResponse.initiatorApproval != 1){
            res.status(500).send({
                message: "initiator didn't approve"
            });
            return;
        }
        if(approvalResponse.receiverApproval != 1){
            res.status(500).send({
                message: "receiver didn't approve"
            });
            return;
        }

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