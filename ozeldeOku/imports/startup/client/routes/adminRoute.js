import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Tracker } from 'meteor/tracker';

import '../../../ui/admin/admin.js';

const adminGroup = FlowRouter.group({
  prefix : '/admin',
  name : 'admin',

  triggersEnter : [function(){

    Tracker.autorun(() => {
      if(Meteor.user() && Meteor.userId()){
        if(Meteor.user().profile.role != 'admin'){
          FlowRouter.go('/');
        }
        else{
        }
      }
    })
  }],

});

adminGroup.route('/', {
  name : 'admin.home',

  action: function(){
      BlazeLayout.render('admin', {top : 'homeLayout', center: 'adminCenter', bottom: 'homeBottom'});
  }
})
