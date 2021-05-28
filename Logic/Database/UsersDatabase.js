const DBQuerier = require('./DatabaseQuerier')

/**
* Returns promise that has an object that says success or (failure and error message)
* @param {*} phoneNumber 
* @param {*} firstName 
* @param {*} lastName 
*/
const createNewUser = (phoneNumber, firstName, lastName) => {
    const newUserQuery =
        `INSERT INTO users
            (phone_number, first_name, last_name)
        VALUES
            (?, ?, ?)`;
    const bindParams = [phoneNumber, firstName, lastName];

    return DBQuerier.executeQuery(newUserQuery, bindParams).then((queryResponse) => {
        return { success: true };
    }).catch((error) => {
        console.log("ERROR -- UserDatabase::createNewUser: ", error);
        return { success: false, errorMessage: error }
    })
}

exports.createNewUser = createNewUser;
