const router = require('express').Router();
const ConvosDatabase = reqlib('/Logic/Database/ConvosDatabase');

router.post('/', async (req, res)=>{
    const convoId = req.body.convoId;
    const phoneNumber = req.body.phoneNumber;
    const approval = req.body.approval;

    if(!convoId){
        res.status(400).send({
            message: 'No convo id set'
        });
        return;
    }
    else if(!phoneNumber){
        res.status(400).send({
            message: 'No phone number set'
        });
        return;
    }
    else if (!approval){
        res.status(400).send({
            message: 'No approval set'
        });
        return;
    }
    else{
        const setApprovalResponse = await ConvosDatabase.setConvoApproval(convoId, phoneNumber, approval);
        if(setApprovalResponse.success){
            res.send({
                message: `Successfully approved (or updated nothing if a param didn't match)`
            });
            return;
        }
        else{
            res.status(500).send({
                message: setApprovalResponse.errorMessage
            });
            return;
        }        
    }
})

module.exports = router;