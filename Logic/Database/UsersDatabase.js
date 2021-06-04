const DBQuerier = require('./DatabaseQuerier')

/**
* Returns promise that has an object that says success or (failure and error message)
* @param {*} phoneNumber 
* @param {*} firstName 
* @param {*} lastName 
*/
const createNewUser = async (phoneNumber, firstName, lastName) => {
    const newUserQuery =
        `INSERT INTO users
            (phone_number, first_name, last_name)
        VALUES
            (?, ?, ?)`;
    const bindParams = [phoneNumber, firstName, lastName];

    try{
        await DBQuerier.executeQuery(newUserQuery, bindParams);
        return {success: true};
    }
    catch(error){
        console.log("ERROR -- UserDatabase::createNewUser: ", error);
        return { success: false, errorMessage: error }
    }    
}

const getUserInfo = async (phoneNumber) => {
    const getUserQuery = 
    `SELECT
        first_name,
        last_name  
    FROM users
    WHERE phone_number=?`;
    const bindParams = [phoneNumber];

    try{
        const queryResponse = await DBQuerier.executeQuery(getUserQuery, bindParams);
        if(queryResponse[0].length === 0)
            throw('no users found');
        return {success: true, firstName: queryResponse[0][0].first_name, lastName: queryResponse[0][0].last_name};
    }
    catch(error){
        console.log("ERROR -- UserDatabase::getUserInfo: ", error);
        return { success: false, errorMessage: error }
    }    
}

exports.createNewUser = createNewUser;
exports.getUserInfo = getUserInfo;
