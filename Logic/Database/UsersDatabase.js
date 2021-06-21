const DBQuerier = require('./DatabaseQuerier')

const addUser = async (phoneNumber, firstName, lastName)=>{
    try{
        const addUserQuery = 
        `INSERT INTO users
            (phone_number, first_name, last_name)
        VALUES
            (?, ?, ?)
        ON DUPLICATE KEY UPDATE
            first_name = ?, last_name=?;` 

        const queryParams = [phoneNumber, firstName, lastName, firstName, lastName];
        await DBQuerier.executeQuery(addUserQuery, queryParams);
        return {success: true};            
    }
    catch(error){
        console.log("ERROR -- UsersDatabase::addUser: ", error);
        return {success: false, errorMessage: error};
    }
}

const getContactsInDb = (contactsList)=>{
    //TODO
}

exports.addUser = addUser;