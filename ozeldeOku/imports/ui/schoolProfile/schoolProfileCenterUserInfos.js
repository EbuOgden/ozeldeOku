import { Template } from 'meteor/templating';

import { Schools } from '/imports/api/collections/schools.js';

import './schoolProfileCenterUserInfos.html';
import './schoolProfileMessages.js';
import './schoolProfileSchoolInfos.js'

Template.schoolProfileCenterUserInfos.helpers({
  school(){
    return Schools.find({"authorizedPersonUserId" : Meteor.userId()});
  }
})
