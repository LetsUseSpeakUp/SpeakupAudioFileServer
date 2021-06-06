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
  
    // Validate the audience and the issuer
    audience: '{YOUR_API_IDENTIFIER}', //replace with your API's audience, available at Dashboard > APIs
    issuer: 'https://letsusespeakup.us.auth0.com/',
    algorithms: [ 'RS256' ]
});

exports.checkJwt = checkJwt;