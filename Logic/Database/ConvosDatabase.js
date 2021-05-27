export default class ConvosDatabase{
    databaseQuerier

    constructor(){
        this.databaseQuerier; //Is singleton
    }

    async addConvo(convoFilePath, convoMetadata){ //TODO: turn convometadata into object
        const addConvoQuery = ""; //TODO
        const response = await this.databaseQuerier.executeQuery(addConvoQuery);

        const wasSuccessful; //TODO: parse response
        return wasSuccessful;
    }

    async approveConvo(convoId, phoneNumber){
        const userId; //TODO: Convert phoneNumber into user id
        //TODO
    }
}