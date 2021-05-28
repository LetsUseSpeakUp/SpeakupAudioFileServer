const router = require('express').Router();
const UsersDatabase = reqlib('/Logic/Database/UsersDatabase');

router.get('/', (req, res)=>{
    res.send({
        message: '/users/create get'
    });
})

router.post('/', async (req, res)=>{
    const phoneNumber = req.body.phoneNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if(!phoneNumber){
        res.status(400).send({
            message: 'Phone number not provided'
        })
    }
    else{        
        const successInfo = await UsersDatabase.createNewUser(phoneNumber, firstName, lastName);
        console.log("/users/create. Successinfo: ", successInfo);
        if(successInfo.success){
            res.status(200).send({
                message: 'Added successfully!'
            });
        }
        else{
            const userIdResponse = await UsersDatabase.getUserIdFromPhoneNumber(phoneNumber)  //TODO: Delete. just for testing
            console.log("/users/create. userIdREsponse: ", userIdResponse);

            res.status(500).send({
                message: successInfo.errorMessage,
                userId: userIdResponse.userId //TODO: Delete. Just for testing
            });
        }                
    }
})

module.exports = router;