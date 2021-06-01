const DBQuerier = require('./DatabaseQuerier');
/**
 * Returns a promise with success/failure
 * @param {*} convoFilePath 
 * @param {*} convoMetadata 
 * @returns 
 */

const addConvo = async (convoFilePath, convoMetadataString) => {
    try {
        const convoMetadata = convertConvoMetadataFromClientToServerFormat(JSON.parse(convoMetadataString));        

        if (!convoMetadata.convoId) throw ('missing convoId from convoMetadata');
        if (!convoMetadata.initiatorPhoneNumber) throw ('missing initiatorPhoneNumber from convoMetadata');
        if (!convoMetadata.receiverPhoneNumber) throw ('missing receiverPhoneNumber from convoMetadata');
        if (!convoMetadata.timestampOfStart) throw ('missing timestampOfStart from convoMetadata');
        if (!convoMetadata.length) throw ('missing length from convoMetadata');

        const addConvoQuery =
            `INSERT INTO convos
            (id, initiator_number, receiver_number, timestamp_of_start, length, file_path)
        VALUES
            (?,?,?,?,?,?)`;
        const bindParams = [convoMetadata.convoId, convoMetadata.initiatorPhoneNumber, convoMetadata.receiverPhoneNumber,
             convoMetadata.timestampOfStart, convoMetadata.length, convoFilePath];

        await DBQuerier.executeQuery(addConvoQuery, bindParams);
        return { success: true };
    }
    catch (error) {
        console.log("ConvosDatabase::addConvo. Error: ", error);
        return { success: false, errorMessage: error };
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
        `SELECT initiator_approval, receiver_approval
        FROM convos WHERE id=?`;

        const bindParams = [convoId];
        const dbResponse = await DBQuerier.executeQuery(approvalInfoQuery, bindParams);
        if(dbResponse[0].length === 0) throw ('convo with convo id not found');

        const initiatorApproval = dbResponse[0][0].initiator_approval;
        const receiverApproval = dbResponse[0][0].receiver_approval;

        return {success: true, initiatorApproval: initiatorApproval, receiverApproval: receiverApproval};
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
                users.phone_number AS receiver_phone_number, 
                users.first_name AS receiver_first_name,
                users.last_name AS receiver_last_name,
                convos.initiator_number AS initiator_phone_number,
                convos.id AS convo_id,
                convos.timestamp_of_start,
                convos.length,
                convos.initiator_approval,
                convos.receiver_approval
            FROM
                users
            JOIN
                convos
            ON
                users.phone_number=convos.receiver_number
            AND
                convos.initiator_number=?
            `;
        
        const receiverQuery =
            `SELECT
                users.phone_number AS initiator_phone_number,
                users.first_name AS initiator_first_name,
                users.last_name AS initiator_last_name,
                convos.receiver_number AS receiver_phone_number,
                convos.id AS convo_id,
                convos.timestamp_of_start,
                convos.length,
                convos.initiator_approval,
                convos.receiver_approval
            FROM
                users
            JOIN
                convos
            ON
                users.phone_number=convos.initiator_number
            AND
                convos.receiver_number=?`;

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

exports.addConvo = addConvo;
exports.setConvoApproval = setConvoApproval;
exports.getConvoFilePath = getConvoFilePath;
exports.getAllConvosMetaDataForUser = getAllConvosMetaDataForUser;
exports.getConvoApprovalInfo = getConvoApprovalInfo;