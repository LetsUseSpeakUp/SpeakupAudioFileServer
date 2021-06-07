const router = require('express').Router();
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

router.post('/getchanneltoken', async(req, res)=>{        
    const channelName = req.body.channel;
    if(!channelName){
        return res.status(500).send({
            message: 'no channel name'
        });
    }
    //TODO: Verify that user phone number is part of channel name

    let uid = req.body.uid;
    if(!uid) uid = 0;

    const currentTimestamp = Math.floor(Date.now() / 1000)
    const timeToLive = 30*60;
    const privilegeExpiredTs = currentTimestamp + timeToLive;

    const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, RtcRole.PUBLISHER, privilegeExpiredTs);
    return res.status(200).send({
        token: token
    });
})

module.exports = router;