require('dotenv').config()
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

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
    console.log("Index::query params: ", req.url);
    // res.sendFile(path.resolve(__dirname, './react_frontend/build', 'index.html'));
    const filePath = path.resolve(__dirname, './react_frontend/build', 'index.html');
    fs.readFile(filePath, 'utf8', function(err, data){
        if(err){
            return console.log("ERROR -- main index serving /playsnippet: ", err);
        }
        data = data.replace(/\$OG_TITLE/g, 'SpeakUp Snippet');
        data = data.replace(/\$OG_DESCRIPTION/g, 'Listen to this snippet from SpeakUp');
        const result = data.replace(/\$OG_AUDIO_LINK/g, 'http://techtechandtechcom.ipage.com/rapgame/SJaFmWwSO-wont_stop_til_I_win,_Im_destined_to_win.mp4'); //TODO
        return res.send(result);
    })    
})

app.get('*', (req, res)=>{ //This is so we get a decent looking 404    
    res.sendFile(path.resolve(__dirname, './react_frontend/build', 'index.html'));
})