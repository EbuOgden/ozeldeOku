import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Tracker } from 'meteor/tracker';

import '/imports/ui/scholarShip/scholarShip.js';

FlowRouter.route('/burs', {
  name : 'burs.route',

  action() {
    BlazeLayout.render('scholarShip', {top : 'homeLayout', center : 'scholarShipCenter', bottom : 'homeBottom'});
  }
})
