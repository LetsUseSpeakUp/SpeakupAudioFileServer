const router = require('express').Router();
const {RtcTokenBuilder, RtcRole} = require('agora-access-token')

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

router.post('/getchanneltoken', async(req, res)=>{        
    const channelName = req.body.channel;
    const initiator_number = req.body.initiator_number;
    const receiver_number = req.body.receiver_number;
    if(!channelName){
        return res.status(500).send({
            message: 'no channel name'
        });
    }
    if(!initiator_number){
        return res.status(500).send({
            message: 'no initiator number'
        });
    }
    if(!receiver_number){
        return res.status(500).send({
            message: 'no receiver number'
        });
    }    
    //TODO: Verify that user phone number is part of channel name
    //TODO: If no 

    let uid = req.body.uid;
    if(!uid) uid = 0;

    const currentTimestamp = Math.floor(Date.now() / 1000)
    const timeToLive = 30*60;
    const privilegeExpiredTs = currentTimestamp + timeToLive;

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, RtcRole.PUBLISHER, privilegeExpiredTs);
    //Tell DB that this user with this name requested a channelToken
    return res.status(200).send({
        token: token
    });
})

module.exports = router;