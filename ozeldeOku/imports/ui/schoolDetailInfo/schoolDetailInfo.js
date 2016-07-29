import { Template } from 'meteor/templating';

import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';

import './schoolDetailInfo.html';
import './schoolDetailInfoCenter.html';

Template.schoolDetailInfoCenter.helpers({
  schoolInfo(){
    return SchoolInfos.findOne({"schoolId" : FlowRouter.getParam('schoolId')});
  }
})

Template.schoolDetailInfoCenter.onRendered(() => {

  document.title = Schools.findOne({"_id" : FlowRouter.getParam("schoolId")}).schoolName
})
