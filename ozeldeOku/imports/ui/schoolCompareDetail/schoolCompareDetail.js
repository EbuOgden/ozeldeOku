import { Templating} from 'meteor/templating';

import { CompareList } from '../../../imports/api/collections/local/schoolCompareList.js'
import { SchoolInfos } from '../../../imports/api/collections/schoolInfos.js'
import { Schools } from '../../../imports/api/collections/schools.js'

import './schoolCompareDetail.html';
import './schoolCompareDetailCenter.html';
import '../home/home.js';

Template.schoolCompareDetail.helpers({

})

Template.schoolCompareDetailCenter.helpers({
  eachSchool(){

    const school = CompareList.find().fetch();
    const forList = [];
    const forInfos = [];

    for(let i = 0; i < school.length; i++){
      forList.push(SchoolInfos.findOne({"schoolId" : school[i].schoolId}));
    }

    return forList;
  }
})

Template.homeLayout.events({
  'click #logoHome'(event){
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

})
