module.exports = function(recipient, text, context, cb) {

  const accountSid = context.webtask.secrets.TWILIO_ACCOUNT_SID; 
  const authToken = context.webtask.secrets.TWILIO_AUTH_TOKEN; 
  const verifySid = context.webtask.secrets.TWILIO_VERIFY_SID;
  const client = require('twilio')(accountSid, authToken); 
  const verifyChannel=(context.message_type==="voice")? "call":context.message_type;
 
  client.verify.services(verifySid)
      .verifications
      .create({
        to: recipient,
        channel:verifyChannel,
        customCode: context.code
      })
      .then(function() {
        cb(null, {});
      }) 
      .catch(function(err) {
        cb(err);
      });
};