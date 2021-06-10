const crypto = require('crypto');
const ENC_KEY = process.env.QUERY_ENC_KEY; //32 char
const IV = process.env.QUERY_INIT_VEC; //16 char


const getEncryptedString = (stringToEncrypt) => {
    try{
        const cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
        let encrypted = cipher.update(stringToEncrypt, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted
    }
    catch(error){
        console.log("ERROR -- Encryption::getEncryptedString: ", error);
        return '';
    }
    
}

const getDecryptedString = (stringToDecrypt) => {
    try{
        const decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
        const decrypted = decipher.update(stringToDecrypt, 'base64', 'utf8');
        return (decrypted + decipher.final('utf8'));
    }
    catch(error){
        console.log("ERROR -- Encryption::getDecryptedString");
        return '';
    }    
}

exports.getEncryptedString = getEncryptedString;
exports.getDecryptedString = getDecryptedString;