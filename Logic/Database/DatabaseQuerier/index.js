const mysql = require('mysql2/promise')

class DatabaseQuerier { //TODO: Refactor this to be a module with functions instead of a class. No need to be a class now that we're connecting to db on each query
    endpoint = process.env.DB_ENDPOINT;
    username = process.env.DB_USER;
    password = process.env.DB_PASSWORD;
    databaseName = process.env.DB_NAME;

    constructor() {
    }

    connectToDatabase(){
        return mysql.createConnection({
            host: this.endpoint,
            user: this.username,
            password: this.password,
            database: this.databaseName
        })
    }    

    /**
     * Returns response promise
     * If query succeeds without error and it is meant to return something, it will return
     * [rows, columns]. Rows is what you're looking for. Then you can get the data from that.
     * So it might look something like 'const id = await executeQuery(idQuery)[0][0].id'
     * @param {*} query 
     */
    async executeQuery(query, bindParams) {
        console.log("DatabaseQuerier::executeQuery: ", query, " with params: ", bindParams);
        let i;
        for (i = 0; i < bindParams.length; i++) {
            if (bindParams[i] == null) {
                console.log("ERROR - DatabaseQuerier::executeQuery. Bind params null");
                throw 'null bind param';
            }
        }

        console.log("DatabaseQuerier::executeQuery. Executing");
        const databaseConnection = await this.connectToDatabase();
        return await databaseConnection.execute(query, bindParams);       
    }

    async _runTestQuery() {
        const databaseConnection = await this.connectToDatabase();
        const testQuery = `SELECT * FROM users`;
        databaseConnection.execute(testQuery).then((response) => {
            console.log(response[0][0]);
            console.log((response[0][0].id));
        })
    }
}

DatabaseQuerier.getInstance = function () {
    if (global.DatabaseQuerier_instance === undefined) {
        global.DatabaseQuerier_instance = new DatabaseQuerier();
    }
    return global.DatabaseQuerier_instance;
}

module.exports = DatabaseQuerier.getInstance();