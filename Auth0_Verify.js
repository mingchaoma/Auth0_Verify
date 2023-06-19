/**
* Handler that will be called during the execution of a SendPhoneMessage flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {SendPhoneMessageAPI} api - Methods and utilities to help change the behavior of sending a phone message.
*/
exports.onExecuteSendPhoneMessage = async (event, api) => {
  // https://www.twilio.com/blog/configure-auth0-mfa-twilio-verify
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID } = event.secrets;

  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  // map auth0 voice value to call
  const messageType = event.message_options.message_type === 'voice' ? 'call' : 'sms';

  const { recipient, code } = event.message_options;

  await client.verify.services(TWILIO_VERIFY_SID)
    .verifications.create({
      to: recipient,
      channel: messageType,
      customCode: code
    })

};
