const mysql = require('mysql2/promise')

class DatabaseQuerier{
    endpoint = "localhost"
    username = "speakupuser"
    password = "speakuppassword"
    databaseName = "speakup_v1"
    connection


    constructor(){
        this.connectToDatabase()
    }

    connectToDatabase(){
        mysql.createConnection({
            host: this.endpoint,
            user: this.username,
            password: this.password,
            database: this.databaseName
        }).then((newConnection)=>{
            this.connection = newConnection;
            console.log("DatabaseQuerier. Connection to db created");
        }).catch((error)=>{
            console.log("ERROR - DatabaseQuerier. Failed to connect to db: ", error);
        })
    }

    /**
     * Returns response promise
     * If query succeeds without error and it is meant to return something, it will return
     * [rows, columns]. Rows is what you're looking for. Then you can get the data from that.
     * So it might look something like 'const id = await executeQuery(idQuery)[0][0].id'
     * @param {*} query 
     */
    executeQuery(query, bindParams){
        console.log("DatabaseQuerier::executing query: ", query, " with params: ", bindParams);
        return this.connection.execute(query, bindParams);
    }

    _runTestQuery(){
        const testQuery = `SELECT * FROM users`;
        this.connection.execute(testQuery).then((response)=>{
            console.log(response[0][0]);
            console.log((response[0][0].id));
        })
    }
}

DatabaseQuerier.getInstance = function(){
    if(global.DatabaseQuerier_instance === undefined){
        global.DatabaseQuerier_instance = new DatabaseQuerier();
    }
    return global.DatabaseQuerier_instance;
}

module.exports = DatabaseQuerier.getInstance();