const router = require('express').Router();
const {RtcTokenBuilder, RtcRole} = require('agora-access-token')
const {addStartedConvo} = require('../../Logic/Database/ConvosDatabase');

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

router.post('/getchanneltoken', async(req, res)=>{        
    const channelName = req.body.channel;
    const isInitiator = (req.body.isInitiator.toLowerCase() === 'true');
    const phone_number = req.user['https://backend.letsusespeakup.com/token/usermetadata/phone_number'] 
        || req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].phone_number;

    const first_name = req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].first_name;
    const last_name = req.user['https://backend.letsusespeakup.com/token/usermetadata/metadata'].last_name;    
    
    if(!channelName){
        return res.status(500).send({
            message: 'no channel name'
        });
    }
    if(isInitiator == null){
        return res.status(500).send({
            message: 'is initiator not set'
        });
    }
    if(!phone_number){
        return res.status(500).send({
            message: 'no phone number'
        });
    }    
    //TODO: Verify that user phone number is part of channel name
    console.log("/Tokens/getchannelToken. is initiator: ", isInitiator);
    const addConvoResponse = await addStartedConvo(channelName, isInitiator, phone_number, first_name, last_name);
    if(!addConvoResponse.success) return res.status(500).send({
        message: addConvoResponse.errorMessage
    });

    let uid = req.body.uid;
    if(!uid) uid = 0;

    const currentTimestamp = Math.floor(Date.now() / 1000)
    const timeToLive = 30*60;
    const privilegeExpiredTs = currentTimestamp + timeToLive;

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, RtcRole.PUBLISHER, privilegeExpiredTs);
    return res.status(200).send({
        token: token
    });
})

module.exports = router;