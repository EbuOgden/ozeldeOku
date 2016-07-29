import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Schools } from '../../api/collections/schools.js';


import './schoolType.html';
import './schoolTypeCenter.html';

Template.schoolTypeCenter.helpers({
  schools(){
    return Schools.find({"schoolType" : FlowRouter.getParam("schoolType"), "haveSchoolDetailInfo" : true});
  }
})
