const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const port = process.env.PORT || 3999;


app.listen(port, ()=>{
    console.log("SpeakupAudioFileServer listening on port ", port);
})

app.get('/', (req, res)=>{
    res.send("SpeakUpAudioFileServer. Base GET.");
})