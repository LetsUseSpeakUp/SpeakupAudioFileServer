class ConvosDatabase{
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

    async setConvoApproval(convoId, phoneNumber, isApproved){
        const userId; //TODO: Convert phoneNumber into user id
        //TODO
    }

    async getConvoFilepath(convoId){
        //TODO
    }

    async getAllConvosMetaDataForUser(phoneNumber){
        const userId; //TODO: Convert phone number into user id
    }
}

module.exports = ConvosDatabase;