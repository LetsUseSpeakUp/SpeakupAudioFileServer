const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send({
        message: '/users/create get'
    });
})

router.post('/', (req, res)=>{
    const phoneNumber = req.body.phoneNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if(!phoneNumber){
        res.status(400).send({
            message: 'phone number not provided!'
        })
    }
    else{
        //TODO: Talk to DB
        
        res.send({
            message: ('Added successfully! Phone number: '
            + phoneNumber + " Firstname: " + firstName + " lastname: "
            + lastName)
        });
    }
})

module.exports = router;