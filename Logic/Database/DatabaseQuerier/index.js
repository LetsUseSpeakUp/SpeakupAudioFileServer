class DatabaseQuerier{
    endpoint = "localhost"
    username = "speakupuser"
    password = "speakuppassword"

    testSingleton = "memberVariable"
    //TODO: Make this a singleton

    constructor(){
        this.connectToDatabase();
        this.testSingleton = "constructed";
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

DatabaseQuerier.getInstance = function(){
    if(global.DatabaseQuerier_instance === undefined){
        global.DatabaseQuerier_instance = new DatabaseQuerier();
    }
    return global.DatabaseQuerier_instance;
}

module.exports = DatabaseQuerier.getInstance();