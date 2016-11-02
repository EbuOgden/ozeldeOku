import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { ReactiveVar } from 'meteor/reactive-var';
import { owlCarousel } from 'meteor/richsilv:owl-carousel';

import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';
import { SchoolNews } from '/imports/api/collections/schoolNews.js';
import { SchoolNotice } from '/imports/api/collections/schoolNotice.js';
import { SchoolEvents } from '/imports/api/collections/schoolEvents.js';
import { SchoolPhotos } from '/imports/api/collections/schoolPhotos.js';
import { SchoolVideos } from '/imports/api/collections/schoolVideos.js';
import { Comments } from '/imports/api/collections/comments.js';
import { Favorites } from '/imports/api/collections/favorites.js';
import { SchoolRates } from '/imports/api/collections/schoolRate.js';

import './schoolDetailInfo.html';
import './schoolTimeline.html';
import './schoolNotifsDetailPage.html';
import './schoolEvents.html';
import './schoolPhotos.html';
import './schoolVideos.html';
import './schoolDetailInfoCenter.html';

const __cAUp__ = new ReactiveVar(0);

const _mI = new ReactiveVar(0);

const __mI = new ReactiveVar(0);

const __sP = new ReactiveVar();

Template.schoolDetailInfoCenter.helpers({
  schoolInfo(){
    if(Meteor.status().connected){

        const __sInfo = SchoolInfos.findOne({"schoolId" : FlowRouter.getQueryParam('schld')});
        const __s = Schools.findOne(FlowRouter.getQueryParam('schld'));

        if(__sInfo && __s){

          return {
              schoolInfos : __sInfo,
              school : __s
          }
        }


    }

  },

  authPers(){
    if(Meteor.status().connected){

      const __school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      if(__school){
        if(__school._id == FlowRouter.getQueryParam('schld')){
          __cAUp__.set(1);
          return  {
            __cont : true,
            _usrName__ :  Meteor.user().profile.name
          }
        }
        else{
          __cAUp__.set(0);
          return false;
        }
      }


    }
  },

  commentCount(){
    if(Meteor.status().connected){
      const __com = Comments.find({"schoolId" : FlowRouter.getQueryParam('schld')});

      if(__com){
        return __com.count();
      }
    }
  },

  comments(){
    if(Meteor.status().connected){
      const __com = Comments.find({"schoolId" : FlowRouter.getQueryParam('schld')});

      if(__com){
        return {
          comment : __com,
          count : __com.count()
        }

      }
    }
  },

  nonSchool(){
    if(Meteor.status().connected){

      var user = Meteor.user();

      if(user){

        const b__ = SchoolRates.findOne({"userId" : Meteor.userId(), "schoolId" : FlowRouter.getQueryParam('schld')});
        if(b__){
          return false;
        }
        else{
          return true;
        }
      }

    }
  },

  nonSchoolComment(){
    if(Meteor.status().connected){

      var user = Meteor.user();

      if(user){

        if(user.profile.role != "School"){
          return true;
        }
        else{
          return false;
        }
      }

    }
  },

  schoolOrRated(){
    if(Meteor.status().connected){
      var user = Meteor.user();

      const b__ = SchoolRates.findOne({"userId" : Meteor.userId(), "schoolId" : FlowRouter.getQueryParam('schld')});
      const s__ = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      if(b__ || s__){
        return true;
      }
      else{
        return false;
      }
    }
  },

  favorited(){
    if(Meteor.status().connected){
      const f = Favorites.findOne({"userId" : Meteor.userId(), "schoolId" : FlowRouter.getQueryParam('schld')});

      if(f){
        return true;
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

  'click .timelineSchool'(event){
    event.preventDefault();
    BlazeLayout.render('schoolDetailInfoCenter', {schoolDetailInfoCenterTop : 'homeLayout', schoolDetailInfoCenterMid: 'schoolTimeline', schoolDetailInfoCenterBottom: 'homeBottom'});
  },

  'click .newsSchool'(event){
    event.preventDefault();
    BlazeLayout.render('schoolDetailInfoCenter', {schoolDetailInfoCenterTop : 'homeLayout', schoolDetailInfoCenterMid: 'schoolNotifsDetailPage', schoolDetailInfoCenterBottom: 'homeBottom'});
  },

  'click .eventsSchool'(event){
    event.preventDefault();
    BlazeLayout.render('schoolDetailInfoCenter', {schoolDetailInfoCenterTop : 'homeLayout', schoolDetailInfoCenterMid: 'schoolEvents', schoolDetailInfoCenterBottom: 'homeBottom'});
  },

  'click .photosSchool'(event){
    event.preventDefault();
    BlazeLayout.render('schoolDetailInfoCenter', {schoolDetailInfoCenterTop : 'homeLayout', schoolDetailInfoCenterMid: 'schoolPhotos', schoolDetailInfoCenterBottom: 'homeBottom'});
  },

  'click .videosSchool'(event){
    event.preventDefault();
    BlazeLayout.render('schoolDetailInfoCenter', {schoolDetailInfoCenterTop : 'homeLayout', schoolDetailInfoCenterMid: 'schoolVideos', schoolDetailInfoCenterBottom: 'homeBottom'});
  },

  'submit #schoolSearch'(event){
    event.preventDefault();
    const schoolName = $('#schoolNameS').val();

    if(isEmpty(schoolName)){
      alert("Lütfen okul ismi giriniz");
      return;
    }
    else{
      FlowRouter.go('/aramaSonuclari?okulIsmi=' + schoolName);
      return;
    }
  },

  'click .commentC'(event){
    event.preventDefault();
    const comment = $('#comment').val();

    if(isEmpty(comment)){
      alert("Lütfen yorum yazınız");
      return;
    }

    const user = Meteor.user();

    Comments.insert({
      schoolId : FlowRouter.getQueryParam('schld'),
      comment : comment,
      whoSend : user.profile.name
    })

    $('#comment').val("");

  },

  'click #rateSchool'(event){
    event.preventDefault();

    const s__ = Schools.findOne(FlowRouter.getQueryParam('schld'));

    if(s__){

      const r = (s__.rate + $('#rateSchool').raty('score')) / 2;

      var a = Schools.update({"_id" : s__._id}, { $set : {
        rate : parseInt(r)
      }})

      if(a){
        SchoolRates.insert({
          userId : Meteor.userId(),
          schoolId : FlowRouter.getQueryParam('schld')
        })
      }
    }


  },

  'click .fav'(event){
    event.preventDefault();

    var a = Favorites.insert({
      userId : Meteor.userId(),
      schoolId : FlowRouter.getQueryParam('schld')
    })

  }
})

Template.schoolDetailInfoCenter.onCreated(function schoolDetailInfoCenterOnCreated(){
  window.scrollTo(0, 0);

})

Template.schoolDetailInfoCenter.onRendered(() => {
  _mI.set(0);

  BlazeLayout.render('schoolDetailInfoCenter', {schoolDetailInfoCenterTop : 'homeLayout', schoolDetailInfoCenterMid : 'schoolTimeline', schoolDetailInfoCenterBottom: 'homeBottom'});

  const dormitoryImage = '/marker-32.png'; /* dormitory icon */

  Tracker.autorun((c) => { /* if page refresh, we should check server connection reactively */

    if(Meteor.status().connected){
      const school = SchoolInfos.findOne({"schoolId" : FlowRouter.getQueryParam('schld')});

      if(school){
        const schoolDetail = school.school;

        document.title = schoolDetail.schoolName;

        const _schLat__ = Number(schoolDetail.schoolLat);
        const __schLng_ = Number(schoolDetail.schoolLng);

        const nearestDormitories = school.nearestDormitories;

        var map = new google.maps.Map(document.getElementById('mapForSchool'), {
          center : {lat : _schLat__, lng : __schLng_},
          zoom : 13,
          mapTypeId : google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        });

        if(__cAUp__.get() == 1){

          var marker = new google.maps.Marker({
                map : map,
                draggable : true,
                position : {lat : _schLat__, lng : __schLng_},
          })

          marker.addListener('dragend', () => {
            if(confirm("Okulun konumunu güncellemek istediğinizden emin misiniz? ")){
              const markerNewLoc = marker.getPosition();

              const news = {
                newLat : markerNewLoc.lat(),
                newLng : markerNewLoc.lng()
              }

              const school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

              Meteor.call('_cord__Upd_', news, school._id, (error, result) => {
                if(error){
                  alert(error.reason);
                }
                else{
                  alert("Konumunuz başarılı bir şekilde güncellenmiştir. Çevredeki yurtlar da otomatik olarak güncellenecektir.");
                }
              })
            }
            else{
              alert("Güncelleme işlemi iptal edilmiştir");
            }

          })
        }
        else{
          var marker = new google.maps.Marker({
                map : map,
                draggable : false,
                position : {lat : _schLat__, lng : __schLng_},
          })
        }

        if(nearestDormitories.length > 1){

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

Template.schoolTimeline.onCreated(function schoolTimelineonCreated() {

})

Template.schoolTimeline.helpers({
  schoolNews(){
    if(Meteor.status().connected){
      const __scNews = SchoolNews.find({"schoolId" : FlowRouter.getQueryParam('schld')}, {limit : 6});
      const __school = Schools.findOne(FlowRouter.getQueryParam('schld'));
      if(__scNews && __school){
        return {
          school : __school,
          count : __scNews.count(),
          news : __scNews
        }
      }

    }

  }
})

Template.schoolNotifsDetailPage.events({
  'click .schoolNotifModal'(event){
    event.preventDefault();
    _mI.set(this._id);
  }
})

Template.schoolNotifsDetailPage.helpers({
  schoolNotifs(){
    if(Meteor.status().connected){
      const __sNotifs = SchoolNotice.find({"schoolId" : FlowRouter.getQueryParam('schld')}, {limit : 6});

      if(__sNotifs){
        return {
          notifs : __sNotifs,
          count : __sNotifs.count()
        }


      }
    }

  },

  read(){
    if(Meteor.status().connected){

      const __sN = SchoolNotice.findOne(_mI.get());

      if(__sN){
        return __sN;
      }

    }
  }

})

Template.schoolEvents.helpers({
  schoolEvents(){
    if(Meteor.status().connected){
      const __sEvents = SchoolEvents.find({"schoolId" : FlowRouter.getQueryParam('schld')}, {limit : 6});

      if(__sEvents){
        console.log(__sEvents.fetch());
        return {
          event : __sEvents,
          count : __sEvents.count()
        }
      }
      else{
      }
    }
  },

  read(){
    if(Meteor.status().connected){

      const __sN = SchoolEvents.findOne(__mI.get());

      if(__sN){
        return __sN;
      }

    }
  }
})

Template.schoolEvents.events({
  'click .schoolEventModal'(event){
    event.preventDefault();
    __mI.set(this._id);
  }
})

Template.schoolPhotos.onRendered(() => {

  $(".owl-carousel-desktop").owlCarousel({
    items : 1,
  });

  $(".owl-carousel-mobile").owlCarousel({
    items : 1
  });

})

Template.schoolPhotos.helpers({
  schoolPhotos(){
    if(Meteor.status().connected){
      const __sPhotos = SchoolPhotos.find({"schoolId" : FlowRouter.getQueryParam('schld')});

      if(__sPhotos){
        return {
          photos : __sPhotos,
          count : __sPhotos.count()
        }
      }
    }
  },

  photo(){
    return __sP.get();
  }
})

Template.schoolPhotos.events({
  'click .h'(event){
    event.preventDefault();

    const a = event.currentTarget;
    __sP.set(a.src);
  }
})


Template.schoolVideos.helpers({
  schoolVideos(){
    if(Meteor.status().connected){
      const __sVideos = SchoolVideos.find({"schoolId" : FlowRouter.getQueryParam('schld')}, {limit : 6});

      if(__sVideos){
        return {
          videos : __sVideos,
          count : __sVideos.count()
        }
      }
    }
  },


})

Template.schoolVideos.onRendered(() => {
  $(".owl-carousel-desktop").owlCarousel({
    items : 1,
  });

  $(".owl-carousel-mobile").owlCarousel({
    items : 1
  });
})



Template.registerHelper('countZero', (c) => {
  if(c > 0){
    return true;
  }
})

Template.registerHelper('highControl', (c) => {
  if(c == "Lise"){
    return true;
  }
})
