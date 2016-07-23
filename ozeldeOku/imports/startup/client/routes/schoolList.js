import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../ui/home/home.js';

FlowRouter.route('/okulTuru/:schoolType', {
  name : 'home.okulTuru',
  action (params) {
    BlazeLayout.render('home', {top : 'homeLayout', center: 'homeCenter', bottom: 'homeBottom'});
    console.log(params.schoolType);
  },

});
