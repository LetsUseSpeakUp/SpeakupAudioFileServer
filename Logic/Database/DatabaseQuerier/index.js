class DatabaseQuerier{
    endpoint = "localhost"
    username = "speakupuser"
    password = "speakuppassword"

    //TODO: Make this a singleton

    constructor(){
        this.connectToDatabase();
    }

    connectToDatabase(){
        //TODO
        //TODO: Console.log on error or success
    }

    /**
     * Returns response promise
     * @param {*} query 
     */
    executeQuery(query){
        //TODO
    }

}

module.exports = DatabaseQuerier;