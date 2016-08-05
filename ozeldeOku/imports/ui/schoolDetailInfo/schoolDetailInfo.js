import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';

import './schoolDetailInfo.html';
import './schoolDetailInfoCenter.html';

Template.schoolDetailInfoCenter.helpers({
  schoolInfo(){
    if(Meteor.status().connected){
        return SchoolInfos.findOne({"schoolId" : FlowRouter.getParam('schoolId')});
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
  const dormitoryImage = '/marker-32.png'; /* dormitory icon */

  Tracker.autorun((c) => { /* if page refresh, we should check server connection reactively */

    if(Meteor.status().connected){
      const school = SchoolInfos.findOne({"schoolId" : FlowRouter.getParam('schoolId')});

      if(school){
        const schoolDetail = school.school;

        document.title = schoolDetail.schoolName;

        const _schLat__ = Number(schoolDetail.schoolLat);
        const __schLng_ = Number(schoolDetail.schoolLng);

        var map = new google.maps.Map(document.getElementById('mapForSchool'), {
          center : {lat : _schLat__, lng : __schLng_},
          zoom : 13,
          mapTypeId : google.maps.MapTypeId.ROADMAP
        });

        new google.maps.Marker({
          map : map,
          position : {lat : _schLat__, lng : __schLng_},
        })


      }

    }
  })




})
