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
    const outputFile = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp4';    
    return outputFile;
}

const createSnippet = async(convoId, snippetStart, snippetEnd)=>{
    try{
        const sourceFile = './Uploaded_Convos/' + convoId + '.mp3';
        const snippedMp3 = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp3';
        const finalSnippet = './Uploaded_Convos/' + convoId + '_' + snippetStart + '_' + snippetEnd + '.mp4';
        snipMP3(sourceFile, snippedMp3, snippetStart, snippetEnd);
        await generateMP4FromMP3(snippedMp3, finalSnippet);    
        return {success: true}
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
    const images = ['mainImage.png'];
    const videoOptions = {
        fps: 1,
        loop: 10000,
        transition: false,
        format: 'mp4'
    };
    return new Promise((resolve, reject)=>{
        videoshow(images, videoOptions)
            .audio(mp3Source)
            .save(mp4Output)
            .on('error', (err, stdout, stderr)=>{
                if(err) reject(err);
            })
            .on('end', (timeTaken)=>{
                console.long('ConvosFileManager::generateMP4FromMP3. Time: ', timeTaken);
                resolve();
            })
    })
}

exports.convertIdToFilePath = convertIdToFilePath;
exports.getSnippet = getSnippet;
exports.convertAACToMP3 = convertAACToMP3;
exports.createSnippet = createSnippet;