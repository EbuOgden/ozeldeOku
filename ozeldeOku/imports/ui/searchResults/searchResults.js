import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Schools } from '/imports/api/collections/schools.js';

import './searchResults.html';
import './searchResultsCenter.html';

Template.searchResultsCenter.helpers({
  result(){
    if(Meteor.status().connected){

      if(FlowRouter.getQueryParam('okulTuru') && FlowRouter.getQueryParam('sehir') && FlowRouter.getQueryParam('ilce') && !FlowRouter.getQueryParam('okulIsmi') && !FlowRouter.getQueryParam('okulTuruT')){

        return {
          school : Schools.find({"schoolType.schoolT" : FlowRouter.getQueryParam('okulTuru'), "schoolCity" : FlowRouter.getQueryParam('sehir'), "schoolCounty" : FlowRouter.getQueryParam('ilce')}, {sort : {rate : -1}}),
          count : Schools.find({"schoolType.schoolT" : FlowRouter.getQueryParam('okulTuru'), "schoolCity" : FlowRouter.getQueryParam('sehir'), "schoolCounty" : FlowRouter.getQueryParam('ilce')}, {sort : {rate : -1}}).count()
        }

      }
      else if(FlowRouter.getQueryParam('okulTuru') && FlowRouter.getQueryParam('sehir') && FlowRouter.getQueryParam('ilce') && FlowRouter.getQueryParam('okulIsmi') && !FlowRouter.getQueryParam('okulTuruT')){

        return {
          school : Schools.find({"schoolType.schoolT" : FlowRouter.getQueryParam('okulTuru'), "schoolCity" : FlowRouter.getQueryParam('sehir'), "schoolCounty" : FlowRouter.getQueryParam('ilce'), "schoolName" : {'$regex' : FlowRouter.getQueryParam('okulIsmi')}}, {sort : {rate : -1}}),
          count : Schools.find({"schoolType.schoolT" : FlowRouter.getQueryParam('okulTuru'), "schoolCity" : FlowRouter.getQueryParam('sehir'), "schoolCounty" : FlowRouter.getQueryParam('ilce'), "schoolName" : {'$regex' : FlowRouter.getQueryParam('okulIsmi')}}, {sort : {rate : -1}}).count()
        }

      }
      else if(FlowRouter.getQueryParam('okulTuru') && FlowRouter.getQueryParam('sehir') && FlowRouter.getQueryParam('ilce') && FlowRouter.getQueryParam('okulTuruT') && !FlowRouter.getQueryParam('okulIsmi')){

        return {
          school : Schools.find({"schoolType.schoolT" : FlowRouter.getQueryParam('okulTuru'), "schoolCity" : FlowRouter.getQueryParam('sehir'), "schoolCounty" : FlowRouter.getQueryParam('ilce'), "schoolType.schoolTT" : FlowRouter.getQueryParam('okulTuruT')}, {sort : {rate : -1}}),
          count : Schools.find({"schoolType.schoolT" : FlowRouter.getQueryParam('okulTuru'), "schoolCity" : FlowRouter.getQueryParam('sehir'), "schoolCounty" : FlowRouter.getQueryParam('ilce'), "schoolType.schoolTT" : FlowRouter.getQueryParam('okulTuruT')}, {sort : {rate : -1}}).count()
        }

      }
      else if(FlowRouter.getQueryParam('okulTuru') && FlowRouter.getQueryParam('sehir') && FlowRouter.getQueryParam('ilce') && FlowRouter.getQueryParam('okulIsmi') && FlowRouter.getQueryParam('okulTuruT')){

        return {
          school : Schools.find({"schoolType.schoolT" : FlowRouter.getQueryParam('okulTuru'), "schoolType.schoolTT" : FlowRouter.getQueryParam('okulTuruT'), "schoolCity" : FlowRouter.getQueryParam('sehir'), "schoolCounty" : FlowRouter.getQueryParam('ilce'), "schoolName" : {'$regex' : FlowRouter.getQueryParam('okulIsmi')}}, {sort : {rate : -1}}),
          count : Schools.find({"schoolType.schoolT" : FlowRouter.getQueryParam('okulTuru'), "schoolType.schoolTT" : FlowRouter.getQueryParam('okulTuruT'), "schoolCity" : FlowRouter.getQueryParam('sehir'), "schoolCounty" : FlowRouter.getQueryParam('ilce'), "schoolName" : {'$regex' : FlowRouter.getQueryParam('okulIsmi')}}, {sort : {rate : -1}}).count()
        }

      }



    }
  }
})

Template.searchResultsCenter.events({
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
