const DBQuerier = require('./DatabaseQuerier')

class UsersDatabase {    
    constructor() {}

    /**
 * Returns promise that has an object that says success or (failure and error message)
 * @param {*} phoneNumber 
 * @param {*} firstName 
 * @param {*} lastName 
 */
    createNewUser(phoneNumber, firstName, lastName) {
        const newUserQuery = ""; //TODO        

        return DBQuerier.executeQuery(newUserQuery).then((queryResponse)=>{
            console.log("UsersDatabase::createNewUser. Response: ", response);
            return {success: true};
        }).catch((error)=>{
            console.log("ERROR -- UserDatabase::createNewUser: ", error);
            return {success: false, errorMessage: error}
        })        
    }

    async getUserIdFromPhoneNumber(phoneNumber){
        const getUserQuery = ""; //TODO
        //TODO
    }
}

module.exports = UsersDatabase;