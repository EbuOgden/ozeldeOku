import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Schools } from '../../api/collections/schools.js';

import './schoolType.html';
import './schoolTypeCenter.html';

import '/client/lib/jquery.raty.js';

Template.schoolTypeCenter.helpers({
  schools(){
    return Schools.find({"schoolType" : FlowRouter.getParam("schoolType"), "haveSchoolDetailInfo" : true}, {sort : {rate : -1}});
  },

  schoolLengthControl(){
    if(Schools.find({"schoolType" : FlowRouter.getParam("schoolType"), "haveSchoolDetailInfo" : true}, {sort : {rate : -1}}).count() > 0){
      return true;
    }

  }
})

Template.schoolTypeCenter.onRendered(() => {

})

Template.schoolTypeCenter.onCreated(function schoolTypeCenterOnCreate(){

})
