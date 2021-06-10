const MP3Cutter = require('./mp3-cutter');

/**
 * Path is based off root
 * @param {*} convoId 
 * @param {*} extension 
 * @returns 
 */
const convertIdToFilePath = (convoId, extension = ".aac")=>{    
    return ('./Uploaded_Convos/' + convoId + extension);
}

const getSnippet = (convoId, snippetStart, snippetEnd)=>{
    const sourceFile = './Uploaded_Convos/converted_to_mp3/' + convoId + '.mp3';
    const outputFile = './Uploaded_Convos/converted_to_mp3/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp3';
    MP3Cutter.cut({
        src: sourceFile,
        target: outputFile,
        start: snippetStart,
        end: snippetEnd
    });
    return outputFile;
}

exports.convertIdToFilePath = convertIdToFilePath;
exports.getSnippet = getSnippet;