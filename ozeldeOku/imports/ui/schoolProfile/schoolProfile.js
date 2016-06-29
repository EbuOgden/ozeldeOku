import { Templating } from 'meteor/templating';

import './schoolProfile.html';
import './schoolProfileCenter.html';

import './schoolProfileCenterUserInfos.js';
import '../../api/client/clientFuncs.js';

Template.schoolProfileCenter.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'click #userInfos'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileCenterUserInfos'})
  },

  'click #schoolInfos'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileSchoolInfos'})
  },

  'click #messages'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileMessages'});
  }


})

Template.schoolProfileCenter.onRendered(() => {

})

Template.schoolProfileCenter.helpers({
  userName(){
    if(Meteor.user()){
        return Meteor.user().profile.name;
    }

  }
})
