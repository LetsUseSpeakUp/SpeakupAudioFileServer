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

router.post('/getContacts', async (req, res)=>{
    try{
        const userContactsPostData = req.body.contacts;
        console.log('/getContacts. Post data: ', userContactsPostData);
        if(userContactsPostData == null) throw 'no contacts provided';
        let userContacts = JSON.parse(req.body.contacts);
        if(typeof(userContacts) === 'string') userContacts = JSON.parse(userContacts);
        const contactsInDBResponse = await UsersDatabase.getContactsInDb(userContacts);
        if(!contactsInDBResponse.success){
            throw contactsInDBResponse.errorMessage;
        }
        else{
            return res.status(200).send({
                contactsInDb: contactsInDBResponse.contactsInDb
            });
        }
    }
    catch(error){
        console.log("ERROR -- /getContacts: ", error)
        return res.status(500).send({
            message: error
        });
    }
     
})

module.exports = router;