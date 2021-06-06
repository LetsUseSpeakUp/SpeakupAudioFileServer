const mysql = require('mysql2/promise')

class DatabaseQuerier {
    endpoint = process.env.DB_ENDPOINT;
    username = process.env.DB_USER;
    password = process.env.DB_PASSWORD;
    databaseName = process.env.DB_NAME;
    connection


    constructor() {
        this.connectToDatabase()
    }

    connectToDatabasePromise(){
        return mysql.createConnection({
            host: this.endpoint,
            user: this.username,
            password: this.password,
            database: this.databaseName
        })
    }

    connectToDatabase() {
        this.connectToDatabasePromise().then((newConnection) => {
            this.connection = newConnection;            
            console.log("DatabaseQuerier. Connection to db created");
        }).catch((error) => {
            console.log("ERROR - DatabaseQuerier. Failed to connect to db: ", error);
            this.destroyAndReconnect();
        });                
    }

    destroyAndReconnect = async ()=>{
        try{
            if(this.connection) await this.connection.destroy();
            setTimeout(()=>{
                console.log("DatabaseQuerier. Destroyed connection. Attempting to reconnect in 2 seconds");
                this.connectToDatabase();
            }, 2000)            
        }
        catch(error){
            console.log("ERROR -- DatabaseQuerier: ", error);
        }                                        
    }

    destroyAndReconnectSingleAttempt = async()=>{
        try{
            if(this.connection) await this.connection.destroy();
            this.connection = await this.connectToDatabasePromise();
        }
        catch(error){
            console.log("ERROR -- DatabaseQuerier::destroyAndReconnectSingleAttempt: ", error);
        } 
    }

    /**
     * Returns response promise
     * If query succeeds without error and it is meant to return something, it will return
     * [rows, columns]. Rows is what you're looking for. Then you can get the data from that.
     * So it might look something like 'const id = await executeQuery(idQuery)[0][0].id'
     * @param {*} query 
     */
    async executeQuery(query, bindParams, retrying = false) {
        console.log("DatabaseQuerier::executeQuery: ", query, " with params: ", bindParams, " retrying: ", retrying);
        let i;
        for (i = 0; i < bindParams.length; i++) {
            if (bindParams[i] == null) {
                console.log("ERROR - DatabaseQuerier::executeQuery. Bind params null");
                throw 'null bind param';
            }
        }
        console.log("DatabaseQuerier::executeQuery. Executing");
        try{
            return await this.connection.execute(query, bindParams);
        }
        catch(error){
            console.log("ERROR -- DatabaseQuerier::executeQuery: ", error);
            if(error.code === 'ETIMEDOUT' && !retrying){
                await this.destroyAndReconnectSingleAttempt();
                return await this.executeQuery(query, bindParams, true);
            }           
            else{
                throw error;
            }
        }
    }

    _runTestQuery() {
        const testQuery = `SELECT * FROM users`;
        this.connection.execute(testQuery).then((response) => {
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