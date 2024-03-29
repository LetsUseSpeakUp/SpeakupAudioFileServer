require('dotenv').config()
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const Encryption = require('./Logic/Encryption')

global.reqlib = require('app-root-path').require;

const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const port = process.env.PORT || 1234;


app.listen(port,  ()=>{
    console.log("SpeakupAudioFileServer listening on port ", port);
})

app.use('/backend', require('./Routes'));

app.use(express.static(path.join(__dirname, './react_frontend/build')));
app.get('/playsnippet', (req, res)=>{        
    const previewLink = 'https://letsusespeakup.com/backend/open/snippets/mp4preview?val=' + req.query.val;
    // const previewLink = 'http://localhost:1234/backend/open/snippets/mp4preview?val=' + req.query.val;

    let decrypted = Encryption.getDecryptedString(req.query.val);
    const parsedQuery = querystring.parse(decrypted);        
    const openGraphTitle = parsedQuery['snippetDescription'] ?? 'SpeakUp Snippet';    

    const filePath = path.resolve(__dirname, './react_frontend/build', 'index.html');
    fs.readFile(filePath, 'utf8', function(err, data){
        if(err){
            console.log("ERROR -- main index serving /playsnippet: ", err);
            return res.status(500).send({
                message: 'Unable to load SpeakUp'
            });
        }
        data = data.replace(/\$OG_TITLE/g, openGraphTitle);
        data = data.replace(/\$OG_DESCRIPTION/g, 'Snippet from SpeakUp');
        const result = data.replace(/\$OG_AUDIO_LINK/g, previewLink);
        return res.send(result);
    })    
})

app.get('*', (req, res)=>{ //This is so we get a decent looking 404    
    res.sendFile(path.resolve(__dirname, './react_frontend/build', 'index.html'));
})