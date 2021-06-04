const router = require('express').Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');

router.post('/', async (req, res)=>{
    const convoId = req.body.convoId;
    
    if(!convoId){
        res.status(400).send({
            message: 'No convo id set'
        });
        return;
    }
    else{
        const getApprovalResponse = await ConvosDatabase.getConvoApprovalInfo(convoId); 
        if(getApprovalResponse.success){
            res.send({
                initiatorApproval: getApprovalResponse.initiatorApproval,
                receiverApproval: getApprovalResponse.receiverApproval
            });
            return;
        }
        else{
            res.status(500).send({
                message: getApprovalResponse.errorMessage
            });
            return;
        }        
    }
})

module.exports = router;