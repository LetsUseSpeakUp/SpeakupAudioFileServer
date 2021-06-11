const MP3Cutter = require('./mp3-cutter');
const {exec} = require('child_process');
const videoshow = require('videoshow');

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
    const outputFile = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp4'; //TODO   
    // const outputFile = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp3';    
    return outputFile;
}

const createSnippet = async(convoId, snippetStart, snippetEnd)=>{
    try{
        const sourceFile = './Uploaded_Convos/' + convoId + '.mp3';
        const snippedMp3 = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp3';
        const finalSnippet = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp4';
        snipMP3(sourceFile, snippedMp3, snippetStart, snippetEnd);
        const conversionResult = await generateMP4FromMP3(snippedMp3, finalSnippet);    //TODO
        return conversionResult;
    }
    catch(error){
        console.error("ERROR -- ConvosFileManager::createSnippet: ", error);
        return {success: false, errorMessage: error};
    }
}

const snipMP3 = (mp3Source, mp3Output, snippetStart, snippetEnd)=>{
    MP3Cutter.cut({
        src: mp3Source,
        target: mp3Output,
        start: snippetStart,
        end: snippetEnd
    });
}

const generateMP4FromMP3 = async(mp3Source, mp4Output)=>{
    const imageSource = 'mainImage.png';
    return new Promise((res, rej)=>{
        const startTime = Date.now();
        exec('ffmpeg -y -loop 1 -i ' + imageSource + ' -i ' + mp3Source + ' -shortest -vf format=yuv420p -c:v libx264 -c:a copy '
            + mp4Output, (error, stdout, stderr)=>{
            if(error) rej({success: false, errorMessage: error});
            
            const endTime = Date.now();
            console.log("ConvosFileManager::generateMP4FromMP3. conversion time: ", (endTime - startTime));
            res({success: true});
        })
    })
}

exports.convertIdToFilePath = convertIdToFilePath;
exports.getSnippet = getSnippet;
exports.convertAACToMP3 = convertAACToMP3;
exports.createSnippet = createSnippet;