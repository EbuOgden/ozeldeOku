import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Tracker } from 'meteor/tracker';

import '../../../ui/schoolProfile/schoolProfile.js';

FlowRouter.route('/okulProfil', {
  triggersEnter : [function(){
        if(!Meteor.userId()){
          FlowRouter.go('/');
        }
        else{

        }
  }],

  name : 'school.profile',
  action : function(){
    BlazeLayout.render('schoolProfile', {top : 'homeLayout', center : 'schoolProfileCenter'});
  }
})
