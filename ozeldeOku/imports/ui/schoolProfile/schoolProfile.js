import { Templating } from 'meteor/templating';

import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';
import { Faculties } from '/imports/api/collections/faculties.js';
import { Departments } from '/imports/api/collections/departments.js';
import { FacultyDepartments } from '/imports/api/collections/facultyDepartments.js';
import { Messages } from '/imports/api/collections/messages.js';
import { MessageRooms } from '/imports/api/collections/messageRooms.js';

import { schoolInfosForComp } from '/imports/api/client/schoolInfosClass.js'
import { depObjForRet } from '/imports/api/client/departmentObjClassForReturn.js';
import { otherScholarInfos } from '/imports/api/client/otherScholarClass.js';

import './schoolProfile.html';
import './schoolProfileCenter.html';
import './schoolProfileSchoolInfos.html';
import './schoolProfileCenterUserInfos.html';
import './schoolProfileMessages.html';

import '../../../client/lib/chosen.jquery.min.js';

Template.schoolProfileCenter.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'click #userInfos'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileCenterUserInfos'})
  },

  'click #schoolInfos'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileSchoolInfos'})
  },

  'click #messages'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileMessages'});
  }


})


Template.schoolProfileCenter.helpers({
  userName(){
    if(Meteor.user()){
        return Meteor.user().profile.name;
    }

  },

  unreadeMessagesCount(){
    return Messages.find({"readerId" : Schools.findOne({"authorizedPersonUserId" : Meteor.userId()})._id}, {isRead : false}).count();
  }
})

Template.schoolProfileCenterUserInfos.helpers({
  school(){
    return Schools.find({"authorizedPersonUserId" : Meteor.userId()});
  }
})


Template.schoolProfileSchoolInfos.onCreated(function schoolProfileSchoolInfosOnCreated() {

  this.__c__Control = new ReactiveVar(0);

  this.__deq__Control = new ReactiveVar(0);

})

Template.schoolProfileSchoolInfos.helpers({
  firstTime(){
    if(Schools.findOne({"authorizedPersonUserId" : Meteor.userId()}).haveSchoolDetailInfo){
        return false;
    }
    else{
        return true;
    }
  },

  schoolInfos(){

    return SchoolInfos.find({"schoolId" : Schools.findOne({"authorizedPersonUserId" : Meteor.userId()})._id});

  },

  faculty(){
    return Faculties.find({});
  },

  department(){
    return Departments.find({});
  },

  facultyInfosLength(){
    if(Template.instance().__c__Control.get() == 1){
      return true;
    }
    else{
      return false;
    }
  },

  quotaInfos(){
    if(Template.instance().__deq__Control.get() == 1){
      return true;
    }
    else{
      return false;
    }
  }
})

Template.schoolProfileSchoolInfos.onRendered(() => {


  if(!Schools.findOne({"authorizedPersonUserId" : Meteor.userId()}).haveSchoolDetailInfo){
    $(".chosen-select").chosen({
      no_results_text : "Aradığınız kriterlere uygun seçenek bulunamadı",
    });

  }
  else{
    Meteor.call('getUniDepartments', Schools.findOne({"authorizedPersonUserId" : Meteor.userId()})._id, (err, result) => {
      if(err){
        alert(err.reason);
      }
      else{
        const departmentIds = result;

        Meteor.call('getDepartments', departmentIds, (err, result) => {
          if(err){
            alert(err.reason);
          }
          else{
            const departments = result;

            if(departments.length > 0){
              for(let i = 0; i < departments.length; i++){

              }
            }

          }
        })
      }
    })
  }

})

Template.schoolProfileSchoolInfos.events({
  'submit #insUpSch'(event, instance){
    event.preventDefault();

    const facultyId = $('#uniFaculties').val();

    const departmentIds = $('#facDepartments').val();

    const facInfos = {
      facId : facultyId,
      departmentIdsFrom : departmentIds
    }

    schoolInfosForComp.setFacultyInfos = facInfos;

    $('#uniFaculties').prop('selectedIndex',0); /* single select reset */

    $("#facDepartments option:selected").removeAttr("selected"); /* multiple select reset */
  },

  'click #addFacultyFinish'(event, instance){
    event.preventDefault();

    const schoolInfos = schoolInfosForComp.getFacultyInfos;

    if(schoolInfosForComp.getFacultyInfosLength() >= 1){

      instance.__c__Control.set(1);

      const facultyInfos = schoolInfosForComp.getFacultyInfos;

      Meteor.call('getFaculties', facultyInfos, (err, result) => {
        if(err){
          alert(err.reason);
        }
        else{
          for(let i = 0; i < result.length; i++){
            $('#facultyQuota').append('<option>' + result[i] + '</option>');
          }
        }

      })

    }

  },

  'change #facultyQuota'(event, instance){
    const facName = $('#facultyQuota').val();

    const facInfos = schoolInfosForComp.getFacultyInfos;

    const faculty = {
      facultyName : facName,
      facultyInfos : facInfos
    }

    if(isEmpty(faculty)){

    }
    else{
      Meteor.call('getDepartmentsByFacName', faculty, (err, result) => {
        if(err){
          alert(err.reason);
        }
        else{

          $('#departmentQuota').empty();

          $('#departmentQuota').append('<option disabled selected>Departman Seçiniz</option>');
          for(let i = 0; i < result.length; i++){
            $('#departmentQuota').append('<option>' + result[i] + '</option>');
          }
        }
      })
    }
  },

  'change #departmentQuota'(event, instance){
    $('#fullQuota').val("");
    $('#quota100').val("");
    $('#quota75').val("");
    $('#quota50').val("");
    $('#quota25').val("");
    instance.__deq__Control.set(1);

  },

  'click #addDepartmentQuotaInfos'(event, instance){
    event.preventDefault();

    const quota = $('#fullQuota').val();
    const quota100 = $('#quota100').val();
    const quota75 = $('#quota75').val();
    const quota50 = $('#quota50').val();
    const quota25 = $('#quota25').val();

    const depName = $('#departmentQuota').val();

    Meteor.call('depIdFromName', depName, (err, result) => {
      if(err){
        alert(err.reason);
        console.log(err);
      }
      else{
        const detailedQuotas = {
          departmentName : depName,
          _id : result,
          quota : quota,
          quotaFull : quota100,
          quota75 : quota75,
          quota50 : quota50,
          quota25 : quota25
        }

        depObjForRet.setDepInfos = detailedQuotas;

        instance.__deq__Control.set(0);

      }
    })

  },

  'change .scholarInfosChecksControl'(event, instance){
    event.preventDefault();
    const target = event.currentTarget;
    if($('#' + target.id).prop('checked')){
      $('#' + target.id + "Rate").css('display', 'block');
    }
    else{
      $('#' + target.id + "Rate").css('display', 'none');
    }

  },

  'click #otherScholarInfoAdd'(event, instance){
    event.preventDefault();

    if(isEmpty($('#otherScholarName').val()) || isEmpty($('#otherScholarText').val())){
      alert("Lütfen tüm alanları doldurunuz!");
    }
    else{
      const otherScholarInfosFC = {
        otherScholarName : $('#otherScholarName').val(),
        otherScholarRate : $('#otherScholarText').val()
      }
      otherScholarInfos.setOtherScholarInfos = otherScholarInfosFC;

      alert($('#otherScholarName').val() + " eklendi.");

      $('#otherScholarName').val("");
      $('#otherScholarText').val("");

    }
  },

  'click #sendSchoolInfos'(event, instance){
    event.preventDefault();

    const checkedScholars = {
      athleteScholar : {
        isHave : $('#athleteScholar').prop('checked'),
        quotaRate : $('#athleteScholarRate').val()
      },

      siblingScholar : {
        isHave : $('#siblingScholar').prop('checked'),
        quotaRate : $('#siblingScholarRate').val()
      },

      firstSelectScholar : {
        isHave : $('#firstSelectScholar').prop('checked'),
        quotaRate : $('#firstSelectScholarRate').val()
      },

      academicScholar : {
        isHave : $('#academicScholar').prop('checked'),
        quotaRate : $('#academicScholarRate').val()
      },

      retiredScholar : {
        isHave : $('#retiredScholar').prop('checked'),
        quotaRate : $('#retiredScholarRate').val()
      }
    };

    const quotasInfos = depObjForRet.getDepInfos;
    var otherQuotaInfos = otherScholarInfos.getOtherScholarInfos;

    const schoolInfos = schoolInfosForComp.getFacultyInfos;

    if(otherQuotaInfos.length == 1){
      otherQuotaInfos = 1;
    }

    const popDeps = [$('#pop1Dep').val(), $('#pop2Dep').val(), $('#pop3Dep').val()];

    for(let i = 0; i < popDeps.length; i++){
      if(isEmpty(popDeps[i])){ popDeps[i] = "Yok"}
    }

    const counts = {
      facultyCount : $('#facultyCount').val(),
      departmentCount : $('#departmentCount').val(),
      licenseSCount : $('#licStuCount').val(),
      masterSCount : $('#masStuCount').val(),
      docSCount : $('#docStuCount').val(),
      profCount : $('#profCount').val()
    }

    for(var key in counts){
      if(isEmpty(counts[key])){ counts[key] = 0}
    }

    var sumSal = $('#sumSalary').val();

    if(isEmpty(sumSal)) { sumSal = "0"}

    var geocoder = new google.maps.Geocoder();

    const school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

    geocoder.geocode({"address" : school.schoolAddress}, (results, status) => {
      if(status == "OK"){
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        const schoolInfosSendObj = {
          scholars : checkedScholars,
          quotas : quotasInfos,
          schoolInfos : schoolInfos,
          popDeps : popDeps,
          counts : counts,
          sumSalary : sumSal,
          otherQuotas : otherQuotaInfos,
          school : school._id,
          lat : lat,
          lng : lng
        }

        Meteor.call('_sch_in_d', schoolInfosSendObj, (err, result) => {
          if(err){
            alert(err.reason);
          }
          else{
            console.log("result : " + result);
          }
        })
      }
      else{
        alert("Teknik bir hata oluştu, lütfen daha sonra tekrar deneyiniz.");
      }
    })

  }


})

Template.schoolProfileMessages.helpers({
  messageRooms(){
    if(Meteor.status().connected){
        return MessageRooms.find({"memberId" : Schools.findOne({"authorizedPersonUserId" : Meteor.userId()})._id});
    }

  },

  messageRoomsLength(){
    if(Meteor.status().connected){
      if(MessageRooms.find({"memberId" : Schools.findOne({"authorizedPersonUserId" : Meteor.userId()})._id}).count() > 0){
        return true;
      }
      else{
        return false;
      }
    }

  }

})

Template.registerHelper('lastMessage', (e) => {
  const message = Messages.find({"roomId" : e}, { sort : { sendTime : -1}}).fetch();

  if(message){
    return message[0].messageContext;
  }
  else{
    return "Sistemde hata var";
  }

})

Template.registerHelper('timeZoneTr', (e) => {
  return moment(e).locale('tr').format('LLLL');

})
