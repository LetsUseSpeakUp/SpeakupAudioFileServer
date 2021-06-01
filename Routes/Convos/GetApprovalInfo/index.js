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
        const setApprovalResponse = await ConvosDatabase.getConvoApprovalInfo(convoId); 
        if(setApprovalResponse.success){
            res.send({
                initiatorApproval: setApprovalResponse.initiatorApproval,
                receiverApproval: setApprovalResponse.receiverApproval
            });
        }
        else{
            res.status(500).send({
                message: setApprovalResponse.errorMessage
            });
        }        
    }
})

module.exports = router;