const DBQuerier = require('./DatabaseQuerier');
/**
 * Returns a promise with success/failure
 * @param {*} convoFilePath 
 * @param {*} convoMetadata 
 * @returns 
 */

const finalizeConvo = async (convoFilePath, convoMetadataString) => {
    try {
        const convoMetadata = convertConvoMetadataFromClientToServerFormat(JSON.parse(convoMetadataString));        

        if (!convoMetadata.convoId) throw ('missing convoId from convoMetadata');        
        if (!convoMetadata.timestampOfStart) throw ('missing timestampOfStart from convoMetadata');
        if (!convoMetadata.length) throw ('missing length from convoMetadata');

        const finalizeConvoQuery = 
        `UPDATE convos
        SET
            timestamp_of_start=?, length=?, file_path=?, is_completed=true
        WHERE
            convos.id=?`;
            
        const bindParams=[convoMetadata.timestampOfStart, convoMetadata.length, convoFilePath, convoMetadata.convoId];

        await DBQuerier.executeQuery(finalizeConvoQuery, bindParams);
        return { success: true };
    }
    catch (error) {
        console.log("ConvosDatabase::addConvo. Error: ", error);
        return { success: false, errorMessage: error };
    }
}

const addStartedConvo = async (convoId, isInitiator, phoneNumber, firstName, lastName)=>{
    console.log("ConvoDatabase::AddStartedConvo. Is initiator: ", isInitiator);
    try{
        if(isInitiator){
            console.log("ConvoDatabase::AddStartedConvo. Is initiator1: ", isInitiator);
            const addStartedConvoQuery_initiator = 
            `INSERT INTO convos
                (id, initiator_number, initiator_first_name, initiator_last_name)
            VALUES
                (?,?,?,?)
            ON DUPLICATE KEY UPDATE 
                initiator_number=?, initiator_first_name=?, initiator_last_name=?`;
            const bindParams = [convoId, phoneNumber, firstName, lastName, phoneNumber, firstName, lastName];
            await DBQuerier.executeQuery(addStartedConvoQuery_initiator, bindParams);
        }
        else{
            console.log("ConvoDatabase::AddStartedConvo. Is initiator2: ", isInitiator);
            const addStartedConvoQuery_receiver = 
            `INSERT INTO convos
                (id, receiver_number, receiver_first_name, receiver_last_name)
            VALUES
                (?,?,?,?)
            ON DUPLICATE KEY UPDATE
                receiver_number=?, receiver_first_name=?, receiver_last_name=?`;
            const bindParams = [convoId, phoneNumber, firstName, lastName, phoneNumber, firstName, lastName];
            await DBQuerier.executeQuery(addStartedConvoQuery_receiver, bindParams);
        }

        return {success: true};
    }
    catch(error){
        console.log("ConvosDatabase::addStartedConvo. Error: ", error);
        return {success: false, errorMessage: error};
    }
}

/**
 * TODO: We need to make a common file between these so
 * we don't have to deal with this in the future
 * @param {*} clientFormatMetadata 
 * @returns 
 */
const convertConvoMetadataFromClientToServerFormat = (clientFormatMetadata)=>{
    if(!clientFormatMetadata.initiatorPhoneNumber) clientFormatMetadata.initiatorPhoneNumber = clientFormatMetadata.initiatorId;
    if(!clientFormatMetadata.receiverPhoneNumber) clientFormatMetadata.receiverPhoneNumber = clientFormatMetadata.receiverId;
    if(!clientFormatMetadata.timestampOfStart) clientFormatMetadata.timestampOfStart = clientFormatMetadata.timestampStarted;
    if(!clientFormatMetadata.length) clientFormatMetadata.length = clientFormatMetadata.convoLength;

    return clientFormatMetadata;
}

const setConvoApproval = async (convoId, phoneNumber, isApproved) => {
    try {
        
        const initiatorQuery =
            `UPDATE convos SET
                initiator_approval=?
            WHERE
                id=? AND initiator_number=?`;

        const receiverQuery =
            `UPDATE convos SET
                receiver_approval=?
            WHERE
                id=? AND receiver_number=?`

        const bindParams = [isApproved, convoId, phoneNumber];
        await DBQuerier.executeQuery(initiatorQuery, bindParams);
        await DBQuerier.executeQuery(receiverQuery, bindParams);

        return { success: true }
    }
    catch (error) {
        return { success: false, errorMessage: error };
    }
}

const getConvoApprovalInfo = async (convoId)=>{
    try{
        const approvalInfoQuery = 
        `SELECT 
            initiator_approval, 
            receiver_approval,
            initiator_number,
            receiver_number
        FROM convos WHERE id=?`;

        const bindParams = [convoId];
        const dbResponse = await DBQuerier.executeQuery(approvalInfoQuery, bindParams);
        if(dbResponse[0].length === 0) throw ('convo with convo id not found');

        const initiatorApproval = dbResponse[0][0].initiator_approval;
        const receiverApproval = dbResponse[0][0].receiver_approval;
        const initiatorNumber = dbResponse[0][0].initiator_number;
        const receiverNumber = dbResponse[0][0].receiver_number;

        return {success: true, initiatorApproval: initiatorApproval, receiverApproval: receiverApproval, initiatorNumber: initiatorNumber, receiverNumber: receiverNumber};
    }
    catch(error){
        return{success: false, errorMessage: error}
    }
}

const getConvoFilePath = async (convoId) => {
    try {
        const getFilepathQuery =
            `SELECT file_path FROM convos WHERE id=?`;
        const bindParams = [convoId];

        const dbResponse = await DBQuerier.executeQuery(getFilepathQuery, bindParams);
        if(dbResponse[0].length === 0) throw ('file path not found for convo id');
        const filePath = (dbResponse[0][0].file_path);
        if(!filePath) throw ('file path not found for convo id (2)');
        return {success: true, filePath: filePath};
    }
    catch (error) {
        return { success: false, errorMessage: error };
    }
}

const getAllConvosMetaDataForUser = async (phoneNumber) => {
    try {

        const initiatorQuery =
            `SELECT
                receiver_number AS receiver_phone_number, 
                receiver_first_name,
                receiver_last_name,
                initiator_number AS initiator_phone_number,
                id AS convo_id,
                timestamp_of_start,
                length,
                initiator_approval,
                receiver_approval
            FROM
                convos            
            WHERE                
                initiator_number=?
            `;
        
        const receiverQuery =
            `SELECT
                initiator_number AS initiator_phone_number,
                initiator_first_name,
                initiator_last_name,
                receiver_number AS receiver_phone_number,
                id AS convo_id,
                timestamp_of_start,
                length,
                initiator_approval,
                receiver_approval
            FROM
                convos
            WHERE
                receiver_number=?`;

            const bindParams = [phoneNumber];
            const metadataAsInitiator = (await DBQuerier.executeQuery(initiatorQuery, bindParams))[0];
            const metadataAsReceiver = (await DBQuerier.executeQuery(receiverQuery, bindParams))[0];

            console.log(metadataAsInitiator[0]);

            return {success: true, metadataAsInitiator: metadataAsInitiator, metadataAsReceiver: metadataAsReceiver};
    }
    catch (error) {
        return { success: false, errorMessage: error };
    }
}

exports.finalizeConvo = finalizeConvo;
exports.addStartedConvo = addStartedConvo;
exports.setConvoApproval = setConvoApproval;
exports.getConvoFilePath = getConvoFilePath;
exports.getAllConvosMetaDataForUser = getAllConvosMetaDataForUser;
exports.getConvoApprovalInfo = getConvoApprovalInfo;