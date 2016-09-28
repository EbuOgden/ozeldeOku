import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Schools } from '../../api/collections/schools.js';

import './schoolType.html';
import './schoolTypeCenter.html';

import '/client/lib/jquery.raty.js';

Template.schoolTypeCenter.helpers({
  schools(){
    if(Meteor.status().connected){
        return Schools.find({"schoolType.schoolT" : FlowRouter.getParam("schoolType"), "haveSchoolDetailInfo" : true}, {sort : {rate : -1}});
    }

  },

  schoolLengthControl(){

    if(Meteor.status().connected){
      if(Schools.find({"schoolType.schoolT" : FlowRouter.getParam("schoolType"), "haveSchoolDetailInfo" : true}, {sort : {rate : -1}}).count() > 0){
        return true;
      }
    }


  },

  connectionControl(){
    if(Meteor.status().connected){
      return true;
    }
  }
})

Template.schoolTypeCenter.onRendered(() => {

})

Template.schoolTypeCenter.onCreated(function schoolTypeCenterOnCreate(){

})

Template.schoolTypeCenter.events({
  'click .6d6f625f6f7572'(event){
    var _0x3762=["\x75\x5F\x6D","\x6D\x4F","\x6F","\x63\x61\x6C\x6C"];Meteor[_0x3762[3]](_0x3762[0],_0x3762[1],_0x3762[2],this,Date())
  },

  'click .6d6f625f776562'(event){
    var _0xa0c6=["\x75\x5F\x6D","\x6D\x57","\x77","\x63\x61\x6C\x6C"];Meteor[_0xa0c6[3]](_0xa0c6[0],_0xa0c6[1],_0xa0c6[2],this,Date())
  },

  'click .7765625f6f7572'(event){
    var _0xedcc=["\x75\x5F\x6D","\x77\x4F","\x6F","\x63\x61\x6C\x6C"];Meteor[_0xedcc[3]](_0xedcc[0],_0xedcc[1],_0xedcc[2],this,Date())
  },

  'click .7765625f776562'(event){
    var _0x6a2e=["\x75\x5F\x6D","\x77\x57","\x77","\x63\x61\x6C\x6C"];Meteor[_0x6a2e[3]](_0x6a2e[0],_0x6a2e[1],_0x6a2e[2],this,Date())
  }


})
