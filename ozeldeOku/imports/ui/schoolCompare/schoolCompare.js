import { Templating } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Schools } from '/imports/api/collections/schools.js'

import { CompareList } from '/imports/api/collections/local/schoolCompareList.js'

import './schoolCompareCenter.html';
import './schoolCompare.html';
import './schoolCompareCenterList';

const __cLE_ = new ReactiveVar(0);
const _sTy__ = new ReactiveVar(0);
const _sTy2__ = new ReactiveVar(0);
const _cHsC__ = new ReactiveVar(0);
const __CHMin___ = new ReactiveVar(0);

Template.schoolCompareCenter.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    FlowRouter.go('/');
    //BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'click #preSchool'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("Anaokulu");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList', schoolCompareCenterBottom : 'homeBottom'});
  },

  'click #primarySchool'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("İlkokul");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList', schoolCompareCenterBottom : 'homeBottom'});
  },

  'click #middleSchool'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("Ortaöğretim");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList', schoolCompareCenterBottom : 'homeBottom'});
  },

  'click #highSchool'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("Lise");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList', schoolCompareCenterBottom : 'homeBottom'});
  },

  'click #university'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("Üniversite");
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList', schoolCompareCenterBottom : 'homeBottom'});
  },

  'click #dormitory'(event, instance){
    event.preventDefault();
    __cLE_.set(0);
    _sTy__.set("Yurt");
    _sTy2__.set(0);
    BlazeLayout.render('schoolCompareCenter', {schoolCompareCenterTop: 'homeLayout', schoolCompareCenterDynamic: 'schoolCompareCenterList', schoolCompareCenterBottom : 'homeBottom'});
  },

  'click .highType2'(event){
    event.preventDefault();

    var a = event.currentTarget;

    switch($(a)[0].innerText){
      case "Hepsi" :
        _sTy__.set("Lise");
        _sTy2__.set(0);
        break;

      case "Öğretmen Lisesi":
        _sTy__.set("Lise");
        _sTy2__.set("Öğretmen Lisesi");
        break;

      case "Endüstri Meslek Lisesi":
        _sTy__.set("Lise");
        _sTy2__.set("Endüstri Meslek Lisesi");
        break;

      case "Ticaret Meslek Lisesi":
        _sTy__.set("Lise");
        _sTy2__.set("Ticaret Meslek Lisesi");
        break;

      case "Teknik Lise":
        _sTy__.set("Lise");
        _sTy2__.set("Teknik Lise");
        break;

      case "Kız Meslek Lisesi":
        _sTy__.set("Lise");
        _sTy2__.set("Kız Meslek Lise");
        break;

      case "Sağlık Meslek Lisesi":
        _sTy__.set("Lise");
        _sTy2__.set("Sağlık Meslek Lise");
        break;

      case "Otelcilik ve Turizm Meslek Lisesi":
        _sTy__.set("Lise");
        _sTy2__.set("Otelcilik ve Turizm Meslek Lise");
        break;

    }

  },

  'click .uniType2'(event){
    event.preventDefault();
    const a = event.currentTarget;

    switch($(a)[0].innerText){
      case "Hepsi":
          _sTy__.set("Üniversite");
          _sTy2__.set(0);
          break;

      case "Lisans":
          _sTy__.set("Üniversite");
          _sTy2__.set("Lisans");
          break;

      case "Önlisans":
        _sTy__.set("Üniversite");
        _sTy2__.set("Önlisans");
        break;

    }

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

// Template.schoolCompareCenter.onCreated(function schoolCompareCenterOnCreated(){
//   __CHMin___.set(0);
//
//   _sTy__.set(0);
//
//   _sTy2__.set(0);
//
//   CompareList.remove({});
// })

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
    if(Meteor.status().connected){

      if(_sTy__.get() != 0 && _sTy2__.get() != 0){
        return Schools.find({"schoolType.schoolT" : _sTy__.get(), "schoolType.schoolTT" : _sTy2__.get(), "haveSchoolDetailInfo" : true}, {limit : 8, skip : __cLE_.get()});
      }

      if(_sTy__.get() != 0){
        return Schools.find({"schoolType.schoolT" : _sTy__.get(), "haveSchoolDetailInfo" : true}, {limit : 8, skip : __cLE_.get()});
      }


    }

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
