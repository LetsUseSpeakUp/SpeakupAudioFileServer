const router = require('express').Router();

router.post('/', (req, res)=>{
    const convoId = req.body.convoId;
    const phoneNumber = req.body.phoneNumber;
    const approval = req.body.approval;

    if(!convoId){
        res.status(400).send({
            message: 'No convo id set'
        });
    }
    else if(!phoneNumber){
        res.status(400).send({
            message: 'No phone number set'
        });
    }
    else if (!approval){
        res.status(400).send({
            message: 'No approval set'
        })
    }
    else{
        //TODO: Get from DB
        res.send({
            message: ('convoId ', convoId + ' had approval status ' + approval
            + " set by " + phoneNumber)
        })
    }
})

module.exports = router;