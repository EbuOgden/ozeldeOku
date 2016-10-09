import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  reCAPTCHA.config({
    publickey: "6LdYnggUAAAAAFFwwDSnL63JiNpgCtVldeI_-xmk"
  })

  filepicker.setKey("A4HBqC4BTSJqn2zLg7FCYz");
})
