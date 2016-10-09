import { Templating} from 'meteor/templating';

import { CompareList } from '../../../imports/api/collections/local/schoolCompareList.js'
import { SchoolInfos } from '../../../imports/api/collections/schoolInfos.js'
import { Schools } from '../../../imports/api/collections/schools.js'

import './schoolCompareDetail.html';
import './schoolCompareDetailCenter.html';

Template.schoolCompareDetailCenter.onRendered(() => {
  $(".chosen-select").chosen({
    no_results_text : "Aradığınız kriterlere uygun seçenek bulunamadı",
  });

  window.scrollTo(0, 0);
})

Template.schoolCompareDetailCenter.events({

  'click .count_2_mob_our'(event){
    const a = event.currentTarget;

    console.log($(a)[0].innerText);

  },

  'click .count_2_mob_web'(event){
    const a = event.currentTarget;

    console.log($(a)[0].innerText);

  },

  'click .count_2_web_our'(event){
    const a = event.currentTarget;

    console.log($(a)[0].innerText);

  },

  'click .count_2_web_web'(event){
    const a = event.currentTarget;

    console.log($(a)[0].innerText);

  },

  'click .count_3_mob_our'(event){
    const a = event.currentTarget;

    console.log($(a)[0].innerText);

  },

  'click .count_3_mob_web'(event){
    const a = event.currentTarget;

    console.log($(a)[0].innerText);

  },

  'click .count_3_web_our'(event){
    const a = event.currentTarget;

    console.log($(a)[0].innerText);

  },

  'click .count_3_web_web'(event){
    const a = event.currentTarget;

    console.log($(a)[0].innerText);

  },

  'click .count_4_mob_web'(event){
    const a = event.currentTarget;

    console.log($(a)[0].innerText);

  },

  'click .count_4_mob_our'(event){

    const a = event.currentTarget;

    console.log($(a)[0].innerText);
  }

  'click .count_4_web_our'(event){


    const a = event.currentTarget;

    console.log($(a)[0].innerText);
  },

  'click .count_4_web_web'(event){


    const a = event.currentTarget;

    console.log($(a)[0].innerText);
  },



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
  },

  schoolC_conT(){
    if(CompareList.find().count() > 0){
      return true;
    }
    else{
      return false;
    }
  },

  schoolC_(){
    return CompareList.find().count();
  }
})

Template.homeLayout.events({
  'click #logoHome'(event){
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

})

Template.registerHelper('count__', (c) => {
  if(c == 2){
    return true;
  }
})

Template.registerHelper('count___', (c) => {
  if(c == 3){
    return true;
  }
})

Template.registerHelper('count____', (c) => {
  if(c == 4){
    return true;
  }
})

Template.registerHelper('othersLength', (c) => {
  if(c.length > 0){
    return true;
  }
})
