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
    const audioLink = 'http://localhost:1234/backend/open/snippets?val=' + req.query.val;
    // const audioLink = 'http://techtechandtechcom.ipage.com/rapgame/SJaFmWwSO-wont_stop_til_I_win,_Im_destined_to_win.mp4';
    // const audioLink ='https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3';
    // const audioLink ='https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4';
    // const audioLink = 'http://localhost:1234/backend/open/snippets?val=6a1ce8c9428369692692742e5ae319327b17fcdc4d9cc4a56d2191393774a99c1b970069231ac72d10b5ea57c8b6f2dc';

    const filePath = path.resolve(__dirname, './react_frontend/build', 'index.html');
    fs.readFile(filePath, 'utf8', function(err, data){
        if(err){
            console.log("ERROR -- main index serving /playsnippet: ", err);
            return res.status(500).send({
                message: 'Unable to load SpeakUp'
            });
        }
        data = data.replace(/\$OG_TITLE/g, 'SpeakUp Snippet');
        data = data.replace(/\$OG_DESCRIPTION/g, 'Listen to this snippet from SpeakUp');
        const result = data.replace(/\$OG_AUDIO_LINK/g, audioLink);
        return res.send(result);
    })    
})

app.get('*', (req, res)=>{ //This is so we get a decent looking 404    
    res.sendFile(path.resolve(__dirname, './react_frontend/build', 'index.html'));
})