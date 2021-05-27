const DBQuerier = require('./DatabaseQuerier')

class UsersDatabase {    
    constructor() {}

    /**
 * Returns promise that has an object that says success or (failure and error message)
 * @param {*} phoneNumber 
 * @param {*} firstName 
 * @param {*} lastName 
 */
    async createNewUser(phoneNumber, firstName, lastName) {
        const newUserQuery = ""; //TODO
        // const response = await this.databaseQuerier.executeQuery(newUserQuery); 

        const wasSuccessful = {success: false, errorMessage: 'dummy create user error message'} //TODO: Use response
        return wasSuccessful;
    }

    async getUserIdFromPhoneNumber(phoneNumber){
        const getUserQuery = ""; //TODO
        //TODO
    }
}

module.exports = UsersDatabase;