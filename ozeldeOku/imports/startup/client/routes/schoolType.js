import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { Schools } from '/imports/api/collections/schools.js';

import '/imports/ui/schoolType/schoolType.js';
import '/imports/ui/schoolDetailInfo/schoolDetailInfo.js';

const schoolType = FlowRouter.group({prefix : '/okulTuru',
  name : 'okul.turu'
})

schoolType.route('/:schoolType', {
    name : 'okul.turu.schoolType',
    triggersEnter : [function(context){
        document.title = context.params.schoolType;

    }],
    action (params) {
        BlazeLayout.render('schoolType', {top : 'homeLayout', center: 'schoolTypeCenter'});
    },
})

schoolType.route('/:schoolType/:schoolId', {
  name : 'okul.turu.schoolType.schoolId',
  triggersEnter : [function(context){

  }],

  action (params){
    
    BlazeLayout.render('schoolDetailInfo', {top : 'homeLayout', center : 'schoolDetailInfoCenter', bottom : 'homeBottom'});
  }
})
