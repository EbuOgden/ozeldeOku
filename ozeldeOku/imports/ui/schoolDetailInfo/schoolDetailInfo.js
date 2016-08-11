import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { ReactiveVar } from 'meteor/reactive-var';

import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';

import './schoolDetailInfo.html';
import './schoolDetailInfoCenter.html';

const __cAUp__ = new ReactiveVar();

Template.schoolDetailInfoCenter.helpers({
  schoolInfo(){
    if(Meteor.status().connected){
        return SchoolInfos.findOne({"schoolId" : FlowRouter.getParam('schoolId')});
    }

  },

  authPers(){
    if(Meteor.status().connected){
      const __school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      if(__school._id == FlowRouter.getParam('schoolId')){
        __cAUp__.set(1);
        return  {
          __cont : true,
          _usrName__ :  Meteor.user().profile.name
        }
      }
      else{
        return false;
      }
    }
  }
})

Template.schoolDetailInfoCenter.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },
})

Template.schoolDetailInfoCenter.onRendered(() => {
  __cAUp__.set(0);

  const dormitoryImage = '/marker-32.png'; /* dormitory icon */

  Tracker.autorun((c) => { /* if page refresh, we should check server connection reactively */

    if(Meteor.status().connected){
      const school = SchoolInfos.findOne({"schoolId" : FlowRouter.getParam('schoolId')});

      if(school){
        const schoolDetail = school.school;

        document.title = schoolDetail.schoolName;

        const _schLat__ = Number(schoolDetail.schoolLat);
        const __schLng_ = Number(schoolDetail.schoolLng);

        const nearestDormitories = school.nearestDormitories;

        var map = new google.maps.Map(document.getElementById('mapForSchool'), {
          center : {lat : _schLat__, lng : __schLng_},
          zoom : 13,
          mapTypeId : google.maps.MapTypeId.ROADMAP
        });

        if(__cAUp__.get() == 1){
          var marker = new google.maps.Marker({
            map : map,
            draggable : true,
            position : {lat : _schLat__, lng : __schLng_},
          })
        }
        else{
          var marker = new google.maps.Marker({
            map : map,
            position : {lat : _schLat__, lng : _schLat__},
          })
        }

        if(nearestDormitories.length > 0){

          for(let i = nearestDormitories.length; i--;){
            new google.maps.Marker({
              map : map,
              position : {lat : Number(nearestDormitories[i].lat), lng : Number(nearestDormitories[i].lng)},
              icon : dormitoryImage,
              title : nearestDormitories[i].dormiName
            })
          }

        }
      }

    }
  })


})
