const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://letsusespeakup.us.auth0.com/.well-known/jwks.json`
    }),
      
    // audience: 'letsusespeakup.com', 
    audience: 'https://letsusespeakup.us.auth0.com/api/v2/', //TODO: Issue a special token for above endpoint. Until then, this is fine
    issuer: 'https://letsusespeakup.us.auth0.com/',
    algorithms: [ 'RS256' ]
});

exports.checkJwt = checkJwt;