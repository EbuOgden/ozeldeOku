import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../ui/schoolCompare/schoolCompare.js';

FlowRouter.route('/okulKarsilastir', {
  name : 'school.compare',
  action : function(){
    BlazeLayout.render('schoolCompare', {top : 'homeLayout', center : 'schoolCompareCenter'});
  }
})
