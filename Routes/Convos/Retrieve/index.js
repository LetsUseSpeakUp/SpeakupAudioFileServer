const router = require('express').Router();

router.get('/', (req, res)=>{
    const convoId = req.query.convoId;
    if(!convoId){
        res.status(400).send({
            message: 'No convo id provided'
        });
    }
    else{
        const fileLink = 'dummyfilelink'; //TODO: DB
        res.send({
            fileLink: fileLink
        });
    }
})

module.exports = router;