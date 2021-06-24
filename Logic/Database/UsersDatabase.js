const DBQuerier = require('./DatabaseQuerier')

const addUser = async (phoneNumber)=>{
    try{
        const addUserQuery = 
        `INSERT INTO users
            (phone_number)
        VALUES
            (?);` 

        const queryParams = [phoneNumber];
        await DBQuerier.executeQuery(addUserQuery, queryParams);
        return {success: true};            
    }
    catch(error){
        console.log("ERROR -- UsersDatabase::addUser: ", error);
        return {success: false, errorMessage: error};
    }
}

const getContactsInDb = async(contactsList)=>{
    try{
        if(contactsList.length === 0) throw 'empty contacts list';

        let phoneNumbersQueryString = 'phone_number=?'
        for(let i= 0; i < contactsList.length - 1; i++){
            phoneNumbersQueryString = phoneNumbersQueryString + ' OR phone_number=?'
        }

        const getContactsQuery = 
        `SELECT * FROM users
        WHERE ` + phoneNumbersQueryString + ';';
        
        const bindParams = [];
        for(const key in contactsList){
            bindParams.push(contactsList[key]);
        }        

        const dbResponse = await DBQuerier.executeQuery(getContactsQuery, bindParams);
        const contactsInDb = dbResponse[0].map((contactResult)=> contactResult.phone_number);
        return {success: true, contactsInDb: JSON.stringify(contactsInDb)};
    }
    catch(error){
        console.log("ERROR -- UsersDatabase::getContactsInDB: ", error);
        return {success: false, errorMessage: error};
    }
    

}

exports.addUser = addUser;
exports.getContactsInDb = getContactsInDb;