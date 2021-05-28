const DBQuerier = require('./DatabaseQuerier');
/**
 * Returns a promise with success/failure
 * @param {*} convoFilePath 
 * @param {*} convoMetadata 
 * @returns 
 */

const addConvo = async (convoFilePath, convoMetadataString) => {
    try {
        const convoMetadata = JSON.parse(convoMetadataString);
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

        const queryParams = [isApproved, convoId, phoneNumber];
        await DBQuerier.executeQuery(initiatorQuery, queryParams);
        await DBQuerier.executeQuery(receiverQuery, queryParams);

        return { success: true }
    }
    catch (error) {
        return { success: false, errorMessage: error };
    }
}

const getConvoFilepath = async (convoId) => {
    try {
        const getFilepathQuery =
            `SELECT file_path FROM convos WHERE id=?`;
        const bindParams = [convoId];

        const dbResponse = DBQuerier.executeQuery(getFilepathQuery, bindParams);
        return (dbResponse[0][0].file_path);
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
exports.getConvoFilepath = getConvoFilepath;
exports.getAllConvosMetaDataForUser = getAllConvosMetaDataForUser;