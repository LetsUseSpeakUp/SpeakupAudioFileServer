const router = require('express').Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');

router.post('/', async (req, res)=>{
    const convoId = req.body.convoId;
    
    if(!convoId){
        res.status(400).send({
            message: 'No convo id set'
        });
    }
    else{
        const getApprovalResponse = await ConvosDatabase.getConvoApprovalInfo(convoId); 
        if(getApprovalResponse.success){
            res.send({
                initiatorApproval: getApprovalResponse.initiatorApproval,
                receiverApproval: getApprovalResponse.receiverApproval
            });
        }
        else{
            res.status(500).send({
                message: getApprovalResponse.errorMessage
            });
        }        
    }
})

module.exports = router;