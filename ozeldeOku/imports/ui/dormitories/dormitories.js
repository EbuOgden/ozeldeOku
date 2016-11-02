import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Schools } from '/imports/api/collections/schools.js';

import "./dormitories.html";
import "./dormitoriesCenter.html";

Template.dormitoriesCenter.helpers({
  connectionControl(){
    if(Meteor.status().connected){
      return true;
    }
    else{
      return false;
    }
  },

  schoolLengthControl(){
    const sch = Schools.find({"schoolType.schoolT" : "Yurt"});

    if(scho.count() > 0){
      return true;
    }
    else{
      return false;
    }
  },

  schools(){
    if(Meteor.status().connected){
        return Schools.find({"schoolType.schoolT" : "Yurt", "haveSchoolDetailInfo" : true}, {sort : {rate : -1}});
    }


  }
})
