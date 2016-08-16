import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { Schools } from '/imports/api/collections/schools.js';

import '/imports/ui/schoolType/schoolType.js';
import '/imports/ui/schoolDetailInfo/schoolDetailInfo.js';
import '/imports/ui/home/home.js';

const schoolType = FlowRouter.group({prefix : '/okulTuru',
  name : 'okul.turu'
})

schoolType.route('/:schoolType', {
    name : 'okul.turu.schoolType',
    triggersEnter : [function(context){
        document.title = context.params.schoolType;
        console.log("came");
    }],
    action (params) {
        BlazeLayout.render('schoolType', {top : 'homeLayout', center: 'schoolTypeCenter', bottom : 'homeBottom'});
    },
})

schoolType.route('/:schoolType/:schoolName', {
  name : 'okul.turu.schoolType.schoolName',
  triggersEnter : [function(context){

  }],

  action (params, queryParams){
    BlazeLayout.render('schoolDetailInfo', {top : 'homeLayout', center : 'schoolDetailInfoCenter', bottom : 'homeBottom'});
  }
})
