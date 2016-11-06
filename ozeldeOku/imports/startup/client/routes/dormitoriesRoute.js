import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Tracker } from 'meteor/tracker';

import '/imports/ui/dormitories/dormitories.js';

FlowRouter.route('/yurtlar', {
  name : 'dormitories',

  action () {
    BlazeLayout.render('dormitories', {top : 'homeLayout', center: 'dormitoriesCenter', bottom: 'homeBottom'});
  },

});
