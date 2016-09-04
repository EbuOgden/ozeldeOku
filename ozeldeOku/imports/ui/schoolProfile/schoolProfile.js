import { Templating } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

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
import './schoolProfileMessageRead.html';

import '../../../client/lib/chosen.jquery.min.js';

const __rId = new ReactiveVar(0);
filepicker.setKey("A4HBqC4BTSJqn2zLg7FCYz");
const __sPp = new ReactiveVar(0);
const __sImg = new ReactiveVar(0);
const __sCover = new ReactiveVar(0);


Template.schoolProfileCenter.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'click #userInfos'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileCenterUserInfos', schoolProfileCenterBottom : 'homeBottom'})
  },

  'click #schoolInfos'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileSchoolInfos', schoolProfileCenterBottom : 'homeBottom'})
  },

  'click #messages'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileMessages', schoolProfileCenterBottom : 'homeBottom'});
  }


})


Template.schoolProfileCenter.helpers({
  userName(){
    if(Meteor.status().connected && Meteor.user()){
        return Meteor.user().profile.name;
    }

  },

  unreadeMessagesCount(){
    if(Meteor.status().connected){

      const school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});
      if(school){
          const readerId = school._id;
          return Messages.find({"readerId" : readerId, isRead : false}).count();
      }

    }
  }
})


Template.schoolProfileCenterUserInfos.helpers({
  school(){
    if(Meteor.status().connected){
      const school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      if(school){
          return school;
      }
    }

  }
})

Template.schoolProfileCenterUserInfos.events({
  'keypress .schoolInfoCnt'(event){
    const form = $('#schoolInfosForm :input');
    if(form.length > 0){
      for(let i = form.length; i--;){

        if(form[i].type != "button"){
          if(isEmpty($(form[i]).val())){
            console.log("empty");
          }


        }

      }
    }
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
  },

  schoolImg(){
    if(__sImg.get() == 0){
      return false;
    }
    else{
      return true;
    }
  },

  schoolImgSrc(){
    return __sImg.get();
  },

  schoolLogo(){
    if(__sPp.get() == 0){
      return false;
    }
    else{
      return true;
    }
  },

  schoolLogoSrc(){
    return __sPp.get();
  },

  schoolCover(){
    if(__sCover.get() == 0){
      return false;
    }
    else{
      return true;
    }
  },

  schoolCoverSrc(){
    return __sCover.get();
  }
})

Template.schoolProfileSchoolInfos.onRendered(() => {

  __sPp.set(0);
  __sImg.set(0);
  __sCover.set(0);

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

    var aboutSchool = $('#aboutSchool').val();

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

    const socialMedias = [$('#schoolFacebook').val(), $('#schoolTwitter').val(), $('#schoolInstagram').val(), $('#schoolGoogleP').val(), $('#schoolYoutube').val(), $('#schoolLinkedin').val()];

    for(var key in counts){
      if(isEmpty(counts[key])){ counts[key] = 0}
    }

    for(let i = socialMedias.length; i--;){
      if(isEmpty(socialMedias[i])){
        socialMedias[i] == "#";
      }
    }

    var sumSal = $('#sumSalary').val();

    if(isEmpty(sumSal)) { sumSal = "0"}

    var geocoder = new google.maps.Geocoder();

    const school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

    if(school){

      if(isEmpty(aboutSchool)) { aboutSchool = school.schoolName + ' hakkında detaylı bilgiler daha sonra eklenecektir.'; }

      if(isEmpty(__sPp.get()) ){
        __sPp.set('/schoolIcon.png');
      }

      if(isEmpty(__sImg.get())){
        __sImg.set('/schoolImage.png');
      }

      if(isEmpty(__sCover.get())){
        __sCover.set('/sa.jpg');
      }

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
            lng : lng,
            about : aboutSchool,
            img : __sImg.get(),
            logo : __sPp.get(),
            cover : __sCover.get(),
            socialMedia : socialMedias
          }

          Meteor.call('_sch_in_d', schoolInfosSendObj, (err, result) => {
            if(err){
              console.log(err);
              alert(err.reason);
            }
            else{
              alert(result);
            }
          })
        }
        else{
          alert("Teknik bir hata oluştu, lütfen daha sonra tekrar deneyiniz.");
        }
      })
    }





  },

  'click #schoolImage'(event){
    event.preventDefault();
    filepicker.pick(
         {
            mimetype: 'image/*',
            container: 'window',
            services: ['COMPUTER'],
            language : 'tr',
            imageDim : [380, 250]

          },
          function(Blob){
            __sImg.set(Blob.url);

          },
          function(FPError){
            console.log(FPError);

          }
    );
  },

  'click #schoolLogo'(event){
    event.preventDefault();
    filepicker.pick(
         {
            mimetype: 'image/*',
            container: 'window',
            services: ['COMPUTER'],
            language : 'tr',
            imageMax : [150, 150]
          },
          function(Blob){
            __sPp.set(Blob.url);

          },
          function(FPError){
            console.log(FPError);
          }
    );
  },

  'click #schoolCover'(event){
    event.preventDefault();
    filepicker.pick(
         {
            mimetype: 'image/*',
            container: 'window',
            services: ['COMPUTER'],
            language : 'tr',
            imageDim : [732, 439]

          },
          function(Blob){
            __sCover.set(Blob.url);

          },
          function(FPError){
            console.log(FPError);

          }
    );
  }



})

Template.schoolProfileMessages.helpers({
  messageRooms(){
    if(Meteor.status().connected){
        return MessageRooms.find({"memberIds" : Schools.findOne({"authorizedPersonUserId" : Meteor.userId()})._id});
    }

  },

  messageRoomsLength(){
    if(Meteor.status().connected){
      if(MessageRooms.find({"memberIds" : Schools.findOne({"authorizedPersonUserId" : Meteor.userId()})._id}).count() > 0){
        return true;
      }
      else{
        return false;
      }
    }

  },

  haveUnreadMessage(id){
    if(Meteor.status().connected){
      const message = Messages.findOne({"roomId" : id, "isRead" : false});

      if(message){
        return true;
      }
      else{
        return false;
      }

    }
  }

})

Template.schoolProfileMessages.events({
  'click .readMessage'(event){
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileMessageRead', schoolProfileCenterBottom : 'homeBottom', data : {_rId : this._id, _readerId : this.memberIds }})
  }
})

Template.schoolProfileMessageRead.onRendered(() => {
  if(__rId.get() != 0){
    if(Meteor.status().connected){
      const arr = [];
        Messages.find({"roomId" : __rId.get()}).map(function(item){
          arr.push(item._id);
        })

        if(arr.length > 0){
          for(let i = arr.length; i--;){
            Messages.update({"_id" : arr[i]}, {
              $set : {
                isRead : true
              }
            })
          }
        }
    }

  }
})

Template.schoolProfileMessageRead.helpers({
  message(c){
    if(Meteor.status().connected){
      const message = Messages.find({"roomId" : c}, {sort : { sendTime : 1}});
      if(message){
        __rId.set(c);
        return message;
      }

    }
  },

  title(c){
    if(Meteor.status().connected){
      return MessageRooms.findOne({"_id" : c}).roomTitle;
    }
  },

  whoSend(c){
    if(Meteor.status().connected){

      if(c == 'ozeldeoku'){
        return 'Özelde Oku';
      }
      else{
        const __usR = Meteor.users.findOne(c).profile.name;

        if(__usR){
          return __usR;
        }
        else{
          return "Null";
        }
      }

    }
  },


})

Template.schoolProfileMessageRead.events({
  'click #sendNewMessage'(event){
    event.preventDefault();

    console.log(this.data());

    // if(!isEmpty($(#newMessageText).val()) && this.data()){
    //   const obj = {
    //     __nMes : $('#newMessageText').val(),
    //     __da : this.data(),
    //     __seId : Meteor.userId(),
    //     __reId :
    //
    //   }
    //
    //
    //       Meteor.call('_sNewM', obj, (err, result) => {
    //         if(err){
    //           alert(err.reason);
    //         }
    //         else{
    //           true;
    //         }
    //       })
    //
    //
    // }
    //



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
