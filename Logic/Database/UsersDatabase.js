export default class UsersDatabase {
    databaseQuerier

    constructor() {
        this.databaseQuerier; //Is singleton
    }

    /**
 * Returns promise that has an object that says success or (failure and error message)
 * @param {*} phoneNumber 
 * @param {*} firstName 
 * @param {*} lastName 
 */
    async createNewUser(phoneNumber, firstName, lastName) {
        const newUserQuery = ""; //TODO
        const response = await this.databaseQuerier.executeQuery(newUserQuery);

        const wasSuccessful; //TODO: use response
        return wasSuccessful;
    }

    async getUserIdFromPhoneNumber(phoneNumber){
        const getUserQuery = ""; //TODO
        //TODO
    }
}