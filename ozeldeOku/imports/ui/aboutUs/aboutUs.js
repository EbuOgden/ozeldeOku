import { Template } from 'meteor/templating';

import './aboutUs.html';

Template.aboutUs.onRendered(() => {
  console.log("hey");
})
