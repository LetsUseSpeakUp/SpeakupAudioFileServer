const router = require('express').Router();

router.get('/', (req, res)=>{
    const phoneNumber = req.query.phoneNumber
    if(!phoneNumber){
        res.status(400).send({
            message: 'phone number not set'
        })
    }
    else{        
        const userId = '3'; //TODO: get from DB
        res.send({
            userId: userId
        })
    }
})

module.exports = router;