import { reCAPTCHA } from 'meteor/altapp:recaptcha';

Meteor.startup(() => {
  reCAPTCHA.config({
    publickey: "6LeqWx8TAAAAAH77Nn1-i3csIZoyM-ozhzdyKJjw"
  })
})
