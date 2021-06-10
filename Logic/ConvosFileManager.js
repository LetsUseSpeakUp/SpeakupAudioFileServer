const MP3Cutter = require('./mp3-cutter');
const {exec} = require('child_process');

/**
 * Path is based off root
 * @param {*} convoId 
 * @param {*} extension 
 * @returns 
 */
const convertIdToFilePath = (convoId, extension = ".aac")=>{    
    return ('./Uploaded_Convos/' + convoId + extension);
}

/**
 * Converts the AAC to MP3 and saves it
 */
const convertAACToMP3 = async (aacFilePath)=>{
    return new Promise((res, rej)=>{
        const mp3FilePath = aacFilePath.slice(0, aacFilePath.length-4) + '.mp3';
        const startTime = Date.now();
        exec('ffmpeg -y -i ' + aacFilePath + ' ' + mp3FilePath, (error, stdout, stderr)=>{
            if(error) rej({success: false, errorMessage: error});
            const endTime = Date.now();
            console.log("ConvosFileManager::convertAACToMP3. conversion time: ", (endTime - startTime));
            res({success: true});
        })
    })
}

const getSnippet = (convoId, snippetStart, snippetEnd)=>{
    const sourceFile = './Uploaded_Convos/' + convoId + '.mp3';
    const outputFile = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp3';
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
exports.convertAACToMP3 = convertAACToMP3;