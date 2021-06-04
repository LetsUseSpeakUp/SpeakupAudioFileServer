const router = require('express').Router();
const UsersDatabase = reqlib('/Logic/Database/UsersDatabase');

router.post('/', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (!phoneNumber) {
        res.status(400).send({
            message: 'Phone number not provided'
        })
        return;
    }

    if (!firstName) {
        res.status(400).send({
            message: 'First name not provided'
        })
        return;
    }

    if (!lastName) {
        res.status(400).send({
            message: 'last Name not provided'
        })
        return;
    }


    const successInfo = await UsersDatabase.createNewUser(phoneNumber, firstName, lastName);
    if (successInfo.success) {
        res.status(200).send({
            message: 'Added successfully!'
        });
        return;
    }
    else {
        res.status(500).send({
            message: successInfo.errorMessage
        });
        return;
    }
})

module.exports = router;