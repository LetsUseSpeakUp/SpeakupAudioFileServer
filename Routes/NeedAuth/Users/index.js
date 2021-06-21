const router = require('express').Router();
const UsersDatabase = require('../../../Logic/Database/UsersDatabase')

router.post('/addUser', async(req, res)=>{
    const phone_number = req.user['https://backend.letsusespeakup.com/token/usermetadata/phone_number']
        || req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].phone_number;

    const first_name = req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata']?.first_name;
    const last_name = req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata']?.last_name;

    const addUserResponse = await UsersDatabase.addUser(phone_number, first_name, last_name);
    if(addUserResponse.success){
        return res.status(200).send();
    }
    else{
        return res.status(500).send({
            message: addUserResponse.errorMessage
        });
    }
})

router.post('/getContacts', (req, res)=>{
    //TODO
})

module.exports = router;