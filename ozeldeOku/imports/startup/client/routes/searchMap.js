import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/searchMap/searchMap.js';

FlowRouter.route('/haritadaAra', {
  name : 'map.search',

  action(){
    BlazeLayout.render('searchMap', {top : 'homeLayout', center : 'searchMapCenter', bottom : 'homeBottom'});
  }
})
