import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  reCAPTCHA.config({
    publickey: "6LeqWx8TAAAAAH77Nn1-i3csIZoyM-ozhzdyKJjw"
  })
})
