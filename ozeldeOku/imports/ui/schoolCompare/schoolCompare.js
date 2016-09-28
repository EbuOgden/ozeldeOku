import { Templating } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Schools } from '/imports/api/collections/schools.js'

import { CompareList } from '/imports/api/collections/local/schoolCompareList.js'

import './schoolCompareCenter.html';
import './schoolCompare.html';
import './schoolCompareCenterList';

const __cLE_ = new ReactiveVar(0);
const _sTy__ = new ReactiveVar();
const _cHsC__ = new ReactiveVar(0);
const __CHMin___ = new ReactiveVar(0);

Template.schoolCompareCenter.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'click #preSchool'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("Anaokulu");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList'});
  },

  'click #primarySchool'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("İlkokul");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList'});
  },

  'click #middleSchool'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("Ortaöğretim");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList'});
  },

  'click #highSchool'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("Lise");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList'});
  },

  'click #university'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("Üniversite");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList'});
  },

  'click #dormitory'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("Yurt");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList'});
  },

  'submit #schoolSearch'(event){
    event.preventDefault();
    const schoolName = $('#schoolNameS').val();

    if(isEmpty(schoolName)){
      alert("Lütfen okul ismi giriniz");
      return;
    }
    else{
      FlowRouter.go('/aramaSonuclari?okulIsmi=' + schoolName);
      return;
    }
  }


})

Template.schoolCompareCenter.onRendered(() => {
  __CHMin___.set(0);

  CompareList.remove({});
})

Template.schoolCompareCenter.helpers({
  cH_ct(){
    if(_cHsC__.get() == 1){
      return true;
    }
    else{
      return false;
    }
  },

  _cmprL(){
    return CompareList.find();
  },

  cH_min2(){
    if(__CHMin___.get() == 1){
      return true;
    }
    else{
      return false;
    }
  }
})

Template.schoolCompareCenter.events({
  'click .cmpListClose'(event){
    event.preventDefault();
    var target = event.currentTarget;

    $('.compList').find('#' + target.id).prop('checked', false);

    CompareList.remove({"_id" : this._id});

    const arrL = $('.compList input:checkbox:checked');

    if(arrL.length >= 1){
        _cHsC__.set(1);
    }
    else{
        _cHsC__.set(0);
    }

    if(arrL.length >= 2){
      __CHMin___.set(1);
    }
    else{
      __CHMin___.set(0);
    }

  },

  'click #schoolCompBut'(event){
    event.preventDefault();

    FlowRouter.go('/okulKarsilastir/detay');
  }
})

Template.schoolCompareCenterList.helpers({
  schools(){
    return Schools.find({"schoolType.schoolT" : _sTy__.get(), "haveSchoolDetailInfo" : true}, {limit : 8, skip : __cLE_.get()});
  },


})

Template.schoolCompareCenterList.onCreated(function schoolCompareCenterListOnCreated(){
})

Template.schoolCompareCenterList.events({
  'click #pagination'(event, instance){/* for pagination */
    __cLE_.set(__cLE_.get() + 8);
  },

  'change .schoolCompCheck'(event){
    const arrL = $('.compList input:checkbox:checked');
    const current = event.currentTarget;
    console.log(current);

    if($(current).prop('checked')){

      if(CompareList.find().count() >= 4){
        alert("Maksimum 4 adet okul karşılaştırabilirsiniz.");
      }
      else{
        CompareList.insert({
          schoolId : current.id,
          schoolImg : $(current).attr('data-img'),
          schoolName : $(current).attr('data-name'),
        })
      }

    }
    else{
      CompareList.remove({"schoolId" : current.id});
    }

    if(arrL.length >= 1){
        _cHsC__.set(1);
    }
    else{
        _cHsC__.set(0);
    }

    if(arrL.length >= 2){
      __CHMin___.set(1);
    }
    else{
      __CHMin___.set(0);
    }

  }
})

// Template.registerHelper('getInfos', (id) => {
//   Meteor.call('')
// })
