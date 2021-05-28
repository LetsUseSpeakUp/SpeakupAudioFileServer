const DBQuerier = require('./DatabaseQuerier');
const UsersDatabase = require('./UsersDatabase');
/**
 * Returns a promise with success/failure
 * @param {*} convoFilePath 
 * @param {*} convoMetaData 
 * @returns 
 */

const addConvo = async (convoFilePath, convoMetaData) => {
    try {
        if (!convoMetaData.convoId) throw ('missing convoId from convoMetaData');
        if (!convoMetaData.initiatorPhoneNumber) throw ('missing initiatorPhoneNumber from convoMetaData');
        if (!convoMetaData.receiverPhoneNumber) throw ('missing receiverPhoneNumber from convoMetaData');
        if (!convoMetaData.timestampOfStart) throw ('missing timestampOfStart from convoMetaData');
        if (!convoMetaData.length) throw ('missing length from convoMetaData');

        const initiatorIdResponse = await UsersDatabase.getUserIdFromPhoneNumber(convoMetaData.initiatorPhoneNumber);
        if (!initiatorIdResponse.success) throw (initiatorIdResponse.errorMessage);
        const initiatorId = initiatorIdResponse.id;

        const receiverIdResponse = await UsersDatabase.getUserIdFromPhoneNumber(convoMetaData.receiverPhoneNumber);
        if (!receiverIdResponse.success) throw (receiverIdResponse.errorMessage);
        const receiverId = receiverIdResponse.id;

        const addConvoQuery =
            `INSERT INTO convos
            (id, initiator_id, receiver_id, timestamp_of_start, length, file_path)
        VALUES
            (?,?,?,?,?,?)`;
        const bindParams = [convoMetaData.convoId, initiatorId, receiverId, convoMetaData.timestampOfStart, convoMetaData.length, convoFilePath];

        await DBQuerier.executeQuery(addConvoQuery, bindParams);
        return { success: true };
    }
    catch (error) {
        return { success: false, errorMessage: error };
    }
}

const setConvoApproval = async (convoId, phoneNumber, isApproved) => {
    try {
        const userIdResponse = await UsersDatabase.getUserIdFromPhoneNumber(convoId);
        if (!userIdResponse.success) throw (userIdResponse.errorMessage);

        const userId = userIdResponse.id;

        const initiatorQuery =
            `UPDATE convos SET
                initiator_approval=?
            WHERE
                id=? AND initiator_id=?`;

        const receiverQuery =
            `UPDATE convos SET
                receiver_approval=?
            WHERE
                id=? AND receiver_id=?`

        const queryParams = [isApproved, convoId, userId];
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
        const userIdResponse = await UsersDatabase.getUserIdFromPhoneNumber(convoId);
        if (!userIdResponse.success) throw (userIdResponse.errorMessage);

        const userId = userIdResponse.id;

        const initiatorQuery =
            `SELECT
                users.phone_number AS receiver_phone_number,
                users.first_name as receiver_first_name,
                users.last_name as receiver_last_name,
                convos.timestamp_of_start,
                convos.length,
                convos.initiator_approval,
                convos.receiver_approval
            FROM
                users
            JOIN
                convos
            ON
                users.id=convos.receiver_id
            AND
                convos.initiator_id=?
            `;
        
        const receiverQuery =
            `SELECT
                users.phone_number AS initiator_phone_number,
                users.first_name AS initiator_first_name,
                users.last_name AS initiator_last_name,
                convos.timestamp_of_start,
                convos.length,
                convos.initiator_approval,
                convos.receiver_approval
            FROM
                users
            JOIN
                convos
            ON
                users.id=initiator_approval
            AND
                convos.receiver_id=?`;

            const bindParams = [userId];
            const metadataAsInitiator = (await DBQuerier.executeQuery(initiatorQuery, bindParams))[0];
            const metadataAsReceiver = (await DBQuerier.executeQuery(receiverQuery, bindParams))[0];

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