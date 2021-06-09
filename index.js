require('dotenv').config()
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Authentication = require('./Authentication');
const path = require('path');

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

app.use('/backend', Authentication.checkJwt, require('./Routes'));

app.use(express.static(path.join(__dirname, '../speakupwebfrontend/build')));
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../speakupwebfrontend/build', 'index.html'));
})