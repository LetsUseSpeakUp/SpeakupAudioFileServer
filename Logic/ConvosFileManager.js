/**
 * Make sure that all files that are directly served to the user
 * (not streamed, but served) have the convoID encrypted.
 * Otherwise, people will be able to read the phone numbers from the
 * snippets' convoIds.
 * 
 * Preview image was generated with ffmpeg -loop 1 -i  mainImage.png -shortest -c:v libx264 -pix_fmt yuv420p -ss 0 -to 3600 1hrimage.mp4
 * Then added keyframe with ffmpeg -i 1hrimage.mp4 -force_key_frames 00:00:00,00:00:01,00:00:02,00:00:03 1hrimage_keyframed4.mp4
 * 
 */
const { exec } = require('child_process');
const Encryption = require('./Encryption');


/**
 * Path is based off root
 * @param {*} convoId 
 * @param {*} extension 
 * @returns 
 */
const convertIdToFilePath = (convoId, extension = ".aac") => {
    convoId = Encryption.getEncryptedString(convoId);
    return ('./Uploaded_Convos/' + convoId + extension);
}


const getSnippet = (convoId, snippetStart, snippetEnd) => {
    convoId = Encryption.getEncryptedString(convoId);
    const outputFile = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.aac';
    return outputFile;
}

/**
 * getSnippet should be used rather than this method in all cases,
 * except when trying to serve a rich preview for iMessage.
 * 
 * @param {*} convoId 
 * @param {*} snippetStart 
 * @param {*} snippetEnd 
 * @returns 
 */
const getSnippetRichPreviewMp4 = (convoId, snippetStart, snippetEnd) => {
    convoId = Encryption.getEncryptedString(convoId);
    const outputFile = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp4'; 
    return outputFile;
}

const createSnippet = async (convoId, snippetStart, snippetEnd) => {
    try {
        convoId = Encryption.getEncryptedString(convoId);
        const sourceFile = './Uploaded_Convos/' + convoId + '.aac';
        const snippedAAC = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.aac';
        const mp4 = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp4';
        snipAAC(sourceFile, snippedAAC, snippetStart, snippetEnd);        
        await generateMP4FromAAC(sourceFile, mp4, snippetStart, snippetEnd);
        return {success: true};
    }
    catch (error) {
        console.error("ERROR -- ConvosFileManager::createSnippet: ", error);
        return { success: false, errorMessage: error };
    }
}

const snipAAC = (aacSource, aacOutput, snippetStart, snippetEnd)=>{
    return new Promise((res, rej)=>{
        const startTime = Date.now();
        exec('ffmpeg -y -i ' + aacSource + ' -c:a copy -ss ' + snippetStart + '-to ' + snippetEnd 
            + aacOutput, (error, stdout, stderr)=>{
            if(error) rej({success: false, errorMessage: error});

            const endTime = Date.now();
            console.log("ConvosFileManager::snipAAC. conversion time: ", (endTime - startTime));
            res({success: true});
        })
    })
}

const generateMP4FromAAC = async(aacSource, mp4Output, snippetStart, snippetEnd)=>{
    const videoSource = 'mainImage_1hr_video.mp4';
    return new Promise((res, rej)=>{
        const startTime = Date.now();
        exec('ffmpeg -y -i ' + videoSource + ' -i ' + aacSource + ' -c:v copy -c:a copy -ss ' + snippetStart + '-to ' + snippetEnd 
            + mp4Output, (error, stdout, stderr)=>{
            if(error) rej({success: false, errorMessage: error});

            const endTime = Date.now();
            console.log("ConvosFileManager::generateMP4FromAAC. conversion time: ", (endTime - startTime));
            res({success: true});
        })
    })
}

exports.convertIdToFilePath = convertIdToFilePath;
exports.getSnippet = getSnippet;
exports.getSnippetRichPreviewMp4 = getSnippetRichPreviewMp4;
exports.createSnippet = createSnippet;