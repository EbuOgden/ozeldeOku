import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../ui/schoolCompare/schoolCompare.js';
import '../../../ui/schoolCompareDetail/schoolCompareDetail.js';

const schoolCompRoute = FlowRouter.group({ prefix : '/okulKarsilastir',
  name : 'school.compare'
})

schoolCompRoute.route('/', {
  name : 'school.compare./',
  action : function(){
    BlazeLayout.render('schoolCompare', {top : 'homeLayout', center : 'schoolCompareCenter'});
  }
})

schoolCompRoute.route('/detay', {
  name : 'school.compare./.detay',
  action : function(){
    BlazeLayout.render('schoolCompareDetail', {top : 'homeLayout', center : 'schoolCompareDetailCenter'});
  }
})
