const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("Don't use get for fileupload!");
})

router.post('/', (req, res)=>{
    //TODO
    res.send("TODO - file upload POST");
})

module.exports = router;