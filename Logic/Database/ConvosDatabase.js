const DBQuerier = require('./DatabaseQuerier')

const addConvo = (convoFilePath, convoMetadata) => { //TODO: turn convometadata into object
    const addConvoQuery = ""; //TODO
    const response = await this.databaseQuerier.executeQuery(addConvoQuery);

    const wasSuccessful; //TODO: parse response
    return wasSuccessful;
}

const setConvoApproval = (convoId, phoneNumber, isApproved) => {
    const userId; //TODO: Convert phoneNumber into user id
    //TODO
}

const getConvoFilepath = (convoId) => {
    //TODO
}

const getAllConvosMetaDataForUser = (phoneNumber) => {
    const userId; //TODO: Convert phone number into user id
}


exports.addConvo = addConvo;
exports.setConvoApproval = setConvoApproval;
exports.getConvoFilepath = getConvoFilepath;
exports.getAllConvosMetaDataForUser = getAllConvosMetaDataForUser;