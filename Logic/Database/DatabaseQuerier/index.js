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
     * @param {*} query 
     */
    executeQuery(query){
        //TODO
    }

}

DatabaseQuerier.getInstance = function(){
    if(global.DatabaseQuerier_instance === undefined){
        global.DatabaseQuerier_instance = new DatabaseQuerier();
    }
    return global.DatabaseQuerier_instance;
}

module.exports = DatabaseQuerier.getInstance();