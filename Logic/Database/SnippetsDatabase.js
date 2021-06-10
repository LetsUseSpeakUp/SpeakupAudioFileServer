const DBQuerier = require('./DatabaseQuerier')

const addSnippet = async (convoId, startTime, endTime)=>{
    try{
        const addSnippetQuery =
        `INSERT INTO snippets
            (convo_id, start_time, end_time)
        VALUES
            (?, ?, ?)`;
        
        const bindParams = [convoId, startTime, endTime];
        await DBQuerier.executeQuery(addSnippetQuery, bindParams);
    }
    catch(error){
        console.log("ERROR -- SnippetsDatabase::addSnippet: ", error);
        return {success: false, errorMessage: error}
    }
}

const doesSnippetExistInDB = async (convoId, startTime, endTime)=>{
    try{
        const doesSnippetExistQuery = 
        `SELECT * FROM snippets
        WHERE convo_id=?
        AND start_time=?
        AND end_time=?`;

        const bindParams = [convoId, startTime, endTime];
        const result = await DBQuerier.executeQuery(doesSnippetExistQuery, bindParams);
        return result[0].length > 0;        
    }
    catch(error){
        console.log("ERROR -- SnippetsDatabase::doesSnippetExistInDB")
        return false;
    }
}

exports.addSnippet = addSnippet;
exports.doesSnippetExistInDB = doesSnippetExistInDB;