const router = require('express').Router();
const UsersDatabase = reqlib('/Logic/Database/UsersDatabase');

router.post('/', async (req, res)=>{
    const phoneNumber = req.body.phoneNumber
    if(!phoneNumber){
        res.status(400).send({
            message: 'phone number not set'
        })
    }
    else{        
        const successInfo = await UsersDatabase.getUserInfo(phoneNumber);
        if(successInfo.success){
            res.status(200).send({
                firstName: successInfo.firstName,
                lastName: successInfo.lastName
            });
        }
        else{
            res.status(500).send({
                message: successInfo.errorMessage
            });
        }         
    }
})

module.exports = router;