const crypto = require('crypto');
const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; // set random encryption key
const IV = "5183666c72eec9e4"; // set random initialisation vector


const getEncryptedString = (stringToEncrypt) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
    let encrypted = cipher.update(stringToEncrypt, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted
}

const getDecryptedString = (stringToDecrypt) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
    const decrypted = decipher.update(stringToDecrypt, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
}

exports.getEncryptedString = getEncryptedString;
exports.getDecryptedString = getDecryptedString;