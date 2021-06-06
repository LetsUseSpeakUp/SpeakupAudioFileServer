const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://letsusespeakup.us.auth0.com/.well-known/jwks.json`
    }),
      
    // audience: 'letsusespeakup.com', 
    audience: 'https://letsusespeakup.us.auth0.com/api/v2/', //TODO: Change to above
    issuer: 'https://letsusespeakup.us.auth0.com/',
    algorithms: [ 'RS256' ]
});

exports.checkJwt = checkJwt;