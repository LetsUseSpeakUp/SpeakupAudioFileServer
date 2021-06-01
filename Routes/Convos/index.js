const express = require('express');
const router = express.Router();

router.use('/upload', require('./Upload'));
router.use('/getmetadata', require('./GetMetaData'));
router.use('/setapproval', require('./SetApproval'));
router.use('/retrieve', require('./Retrieve'));
router.use('/getapprovalinfo', require('./GetApprovalInfo'));

module.exports = router;