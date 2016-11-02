import { Templating } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';
import { Faculties } from '/imports/api/collections/faculties.js';
import { Departments } from '/imports/api/collections/departments.js';
import { FacultyDepartments } from '/imports/api/collections/facultyDepartments.js';
import { Messages } from '/imports/api/collections/messages.js';
import { MessageRooms } from '/imports/api/collections/messageRooms.js';

import { SchoolNews } from '/imports/api/collections/schoolNews.js';
import { SchoolNotice } from '/imports/api/collections/schoolNotice.js';
import { SchoolEvents } from '/imports/api/collections/schoolEvents.js';
import { SchoolPhotos } from '/imports/api/collections/schoolPhotos.js';
import { SchoolVideos } from '/imports/api/collections/schoolVideos.js';

import { schoolInfosForComp } from '/imports/api/client/schoolInfosClass.js'
import { depObjForRet } from '/imports/api/client/departmentObjClassForReturn.js';
import { otherScholarInfos } from '/imports/api/client/otherScholarClass.js';

import './schoolProfile.html';
import './schoolProfileCenter.html';
import './schoolProfileSchoolInfos.html';
import './schoolProfileCenterUserInfos.html';
import './schoolProfileMessages.html';
import './schoolProfileMessageRead.html';
import './schoolProfileNoticeEvents.html';
import './schoolProfilePhotosVideos.html';

import '../../../client/lib/chosen.jquery.min.js';

const __rId = new ReactiveVar(0);

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
  },

  'click #noticeEvents'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfileNoticeEvents', schoolProfileCenterBottom : 'homeBottom'});
  },

  'click #photosVideos'(event){
    event.preventDefault();
    BlazeLayout.render('schoolProfileCenter', {schoolProfileCenterInfosTop: 'homeLayout', schoolProfileCenterInfosDynamic : 'schoolProfilePhotosVideos', schoolProfileCenterBottom : 'homeBottom'});
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
  },

  'click #logOut'(event){
    event.preventDefault();
    FlowRouter.go('/');
    Meteor.logout();
  }


})

Template.schoolProfile.onRendered(() => {
})


Template.schoolProfileCenter.helpers({
  userName(){
    if(Meteor.status().connected && Meteor.user()){
        return Meteor.user().profile.name;
    }

  },

  unreadMessagesCount(){
    if(Meteor.status().connected){

      const school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});
      const user = Meteor.user();
      if(user){
        if(school){
            const readerId = school._id;
            return Messages.find({"readerId" : readerId, isRead : false}).count();

        }

        if(user.profile.role != "School"){
            const a = Messages.find({"ownerId" : Meteor.userId(), isRead : false});
            if(a){
              return a.count();
            }

        }

      }


    }
  },

  nonSchool(){
    if(Meteor.status().connected){

      var user = Meteor.user();

      if(user){
        if(user.profile.role != "School"){
            return true;
        }
      }

    }
  },

  school(){
    if(Meteor.status().connected){

      var user = Meteor.user();

      if(user){
        if(user.profile.role == "School"){
            return true;
        }
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

  },

  schoolP(){
    if(Meteor.status().connected){

      var user = Meteor.user();

      if(user){
        if(user.profile.role == "School"){
            return true;
        }
      }

    }
  },

  nonSchool(){
    if(Meteor.status().connected){

      var user = Meteor.user();

      if(user){
        if(user.profile.role != "School"){
            return true;
        }
      }

    }
  },

  profileUser(){
    if(Meteor.status().connected){
      return Meteor.user();

    }

  }
})

Template.schoolProfileCenterUserInfos.events({
  'click #nameNewUpdate'(event){

    event.preventDefault();

    if($('#nameNew').val() == ""){
      alert("Lütfen kutucuğu doldurunuz");
      return;
    }
    else{
      const a = $('#nameNew').val();

      var c = Meteor.users.update({
        "_id" : Meteor.userId()
      },
    {
      $set : {
        "profile.name" : a
      }
    });

    if(c){
      alert("Güncellendi");
    }
    else{
      alert("Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
    }
    }
  },

  'click #surnameNewUpdate'(event){

    event.preventDefault();

    if($('#surnameNew').val() == ""){
      alert("Lütfen kutucuğu doldurunuz");
      return;
    }
    else{
      const a = $('#surnameNew').val();

      var c = Meteor.users.update({
        "_id" : Meteor.userId()
      },
    {
      $set : {
        "profile.surname" : a
      }
    });

    if(c){
      alert("Güncellendi");
    }
    else{
      alert("Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
    }
    }
  },

  'click #passwordNewUserUpdate'(event){

    const old = $('#oldPassUser').val();
    const newP = $('#newPassUser').val();
    const newPR = $('#newPassRUser').val();
    if(isEmpty(old) || isEmpty(newP) || isEmpty(newPR)){
      alert("Lütfen tüm kutucukları doldurunuz.");
      return;
    }

    if(isEqual(newP, newPR)){
      Accounts.changePassword(old, newPR, (error) => {
        if(error){
          console.log(error);
        }
        else{
          alert("Şifreniz başarılı bir şekilde güncellenmiştir.");
          $('#oldPassUser').val("");
          $('#newPassUser').val("");
          $('#newPassRUser').val("");
        }
      })

    }
    else{
      alert("Lütfen yeni şifrenizi tekrar kontrol ediniz.");
      return;
    }
  },

  'click #emailNewUpdate'(event){

    event.preventDefault();

    if($('#emailNew').val() == ""){
      alert("Lütfen kutucuğu doldurunuz");
      return;
    }
    else{
      const a = [{"address" : $('#emailNew').val(), "verified" : false}];


      var c = Meteor.users.update({
        "_id" : Meteor.userId()
      },
    {
      $set : {
        "emails" : a
      }
    });

    if(c){
      alert("Güncellendi");
    }
    else{
      alert("Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
    }
    }
  },

  'click #updateSchoolInfosBut'(event){
    event.preventDefault();
    const form = $('#schoolInfosForm :input');

    var a = false;
    if(form.length > 0){
      for(let i = form.length; i--;){

        if(form[i].type != "button"){
          if(isEmpty($(form[i]).val())){
          }
          else{
            a = true;
            break;

          }


        }

      }
    }
    if(a){
      var b = [];

      for(let i = form.length; i--;){
        if(form[i].type != "button"){
          if(isEmpty($(form[i]).val())){
          }
          else{
            var obj = {
              id : $(form[i])[0].id,
              val : $(form[i]).val()
            }
            b.push(obj);
          }


        }
      }

      if(b.length > 0){

          const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()})
          for(let i = b.length; i--;){
            if(b[i].id == "schoolName"){

              if(confirm("Okul adınızı güncellemek istediğinize emin misiniz?")){
                var a = Schools.update({
                  "_id" : s._id
                }, {
                  $set : {
                    "schoolName" : b[i].val
                  }
                })

                if(a){
                  const a = SchoolInfos.findOne({"schoolId" : s._id})
                  if(a){
                    var b = SchoolInfos.update({
                      "_id" : a._id
                    },
                    {
                      $set : {
                        "school.schoolName" : b[i].val
                      }
                    }
                    )
                    if(b){
                      $('#schoolName').val("")
                      alert("Okul bilgileriniz başarılı bir şekilde güncellenmiştir.");
                    }
                  }
                  else{
                    $('#schoolName').val("")
                    alert("Okul bilgileriniz başarılı bir şekilde güncellenmiştir.");
                  }
                }
                else{
                }
              }
              else{
                return;
              }
            }
            else if(b[i].id == "tradeName"){
              if(confirm("Ticari ünvanı güncellemek istediğinize emin misiniz?")){
                var a = Schools.update({
                  "_id" : s._id
                }, {
                  $set : {
                    "tradeName" : b[i].val
                  }
                })

                if(a){
                  $('#tradeName').val("")
                  alert("Okul bilgileriniz başarılı bir şekilde güncellenmiştir.");
                }
                else{
                  alert("Teknik bir hata oluştu. Lütfen tekrar deneyiniz.");
                }
              }
              else{
                return;
              }


            }
            else if(b[i].id == "taxNo"){
              if(confirm("Vergi numaranızı güncellemek istediğinize emin misiniz?")){
                var a = Schools.update({
                  "_id" : s._id
                }, {
                  $set : {
                    "taxNo" : b[i].val
                  }
                })

                if(a){
                  $('#taxNo').val("")
                  alert("Okul bilgileriniz başarılı bir şekilde güncellenmiştir.");
                }
                else{
                  alert("Teknik bir hata oluştu. Lütfen tekrar deneyiniz.");
                }
              }
              else{
                return;
              }


            }
            else if(b[i].id == "autPerson"){
              if(confirm("Yetkili kişiyi güncellemek istediğinize emin misiniz?")){
                var a = Schools.update({
                  "_id" : s._id
                }, {
                  $set : {
                    "authorizedPerson" : b[i].val
                  }
                })

                if(a){
                  $('#autPerson').val("")
                  alert("Okul bilgileriniz başarılı bir şekilde güncellenmiştir.");
                }
                else{
                  alert("Teknik bir hata oluştu. Lütfen tekrar deneyiniz.");
                }
              }
              else{
                return;
              }


            }
            else if(b[i].id == "autPersonEmail"){
              if(confirm("E-mailinizi güncellemek istediğinize emin misiniz?")){
                var a = Schools.update({
                  "_id" : s._id
                }, {
                  $set : {
                    "schoolEmail" : b[i].val
                  }
                })

                if(a){
                  $('#autPersonEmail').val("")
                  alert("Okul bilgileriniz başarılı bir şekilde güncellenmiştir.");
                }
                else{
                  alert("Teknik bir hata oluştu. Lütfen tekrar deneyiniz.");
                }
              }
              else{
                return;
              }


            }
            else if(b[i].id == "phoneNum"){
              if(confirm("Telefon numaranızı güncellemek istediğinize emin misiniz?")){
                var a = Schools.update({
                  "_id" : s._id
                }, {
                  $set : {
                    "schoolPhoneNumber" : b[i].val
                  }
                })

                if(a){
                  $('#schoolPhoneNumber').val("")
                  alert("Okul bilgileriniz başarılı bir şekilde güncellenmiştir.");
                }
                else{
                  alert("Teknik bir hata oluştu. Lütfen tekrar deneyiniz.");
                }
              }
              else{
                return;
              }


            }
            else if(b[i].id == "faxNum"){
              if(confirm("Fax numaranızı güncellemek istediğinize emin misiniz?")){
                var a = Schools.update({
                  "_id" : s._id
                }, {
                  $set : {
                    "schoolFaxNumber" : b[i].val
                  }
                })

                if(a){
                  $('#faxNum').val("")
                  alert("Okul bilgileriniz başarılı bir şekilde güncellenmiştir.");
                }
                else{
                  alert("Teknik bir hata oluştu. Lütfen tekrar deneyiniz.");
                }
              }
              else{
                return;
              }


            }
            else if(b[i].id == "address"){
              if(confirm("Adresinizi güncellemek istediğinize emin misiniz?")){
                var a = Schools.update({
                  "_id" : s._id
                }, {
                  $set : {
                    "schoolAddress" : b[i].val
                  }
                })

                if(a){
                  $('#address').val("")
                  alert("Okul bilgileriniz başarılı bir şekilde güncellenmiştir.");
                }
                else{
                  alert("Teknik bir hata oluştu. Lütfen tekrar deneyiniz.");
                }
              }
              else{
                return;
              }


            }
          }
      }

    }



  },

  'click #updatePass'(event){
    event.preventDefault();

    const old = $('#oldPass').val();
    const newP = $('#newPass').val();
    const newPR = $('#newPassR').val();
    if(isEmpty(old) || isEmpty(newP) || isEmpty(newPR)){
      alert("Lütfen tüm kutucukları doldurunuz.");
      return;
    }

    if(isEqual(newP, newPR)){
      Accounts.changePassword(old, newPR, (error) => {
        if(error){
          console.log(error);
        }
        else{
          alert("Şifreniz başarılı bir şekilde güncellenmiştir.");
          $('#oldPass').val("");
          $('#newPass').val("");
          $('#newPassR').val("");
        }
      })

    }
    else{
      alert("Lütfen yeni şifrenizi tekrar kontrol ediniz.");
      return;
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

  schoolInfosNotFirst(){
      if(Meteor.status().connected){
        const a = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

        if(a){

          const b = SchoolInfos.findOne({"schoolId" : a._id});

          if(b){
            console.log(b);
            return b;


          }
        }
      }
  },

  schoolTypeUni(){
    if(Meteor.status().connected){
        if(Schools.findOne({"authorizedPersonUserId" : Meteor.userId()}).schoolType.schoolT == "Üniversite"){
          return true;
        }
        else{
          return false;
        }
    }

  },

  schoolTypeHigh(){
    if(Meteor.status().connected){
        if(Schools.findOne({"authorizedPersonUserId" : Meteor.userId()}).schoolType.schoolT == "Lise"){
          return true;
        }
        else{
          return false;
        }
    }

  },

  schoolTypeMidFirst(){
    if(Meteor.status().connected){
        if((Schools.findOne({"authorizedPersonUserId" : Meteor.userId()}).schoolType.schoolT == "Ortaöğretim") ||  (Schools.findOne({"authorizedPersonUserId" : Meteor.userId()}).schoolType.schoolT == "İlkokul") || (Schools.findOne({"authorizedPersonUserId" : Meteor.userId()}).schoolType.schoolT == "Anaokulu")){
          return true;
        }
        else{
          return false;
        }
    }

  },

  schoolTypeDormitory(){
    if(Meteor.status().connected){
        if(Schools.findOne({"authorizedPersonUserId" : Meteor.userId()}).schoolType.schoolT == "Yurt"){
          return true;
        }
        else{
          return false;
        }
    }
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

  'click #priceUpdateButton'(event){
    event.preventDefault();

    if($('#priceUpdate').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const price = $('#priceUpdate').val();

      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "financialInfos.price" : parseInt(price)
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }

      }
    }

  },

  'click #totalPlaceUpdateButton'(event){
    event.preventDefault();

    if($('#totalPlaceUpdate').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const b = $('#totalPlaceUpdate').val();

      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "totalPlace" : b
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }

      }
    }
  },

  'click #sumSalaryUpdateButton'(event){
    event.preventDefault();

    if($('#sumSalaryUpdate').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const b = $('#sumSalaryUpdate').val();

      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "sumSalary" : b
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }

      }
    }
  },

  'click #doctorateCountUpdateButton'(event){
    event.preventDefault();

    if($('#doctorateCountUpdate').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const b = $('#doctorateCountUpdate').val();

      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "studentCountInfos.doctorate" : b
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }

      }
    }
  },

  'click #postGraduateCountUpdateButton'(event){
    event.preventDefault();

    if($('#postGraduateCountUpdate').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const b = $('#postGraduateCountUpdate').val();

      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "studentCountInfos.postGraduate" : b
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }

      }
    }
  },

  'click #licenseCountUpdateButton'(event){
    event.preventDefault();

    if($('#licenseCountUpdate').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const b = $('#licenseCountUpdate').val();

      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "studentCountInfos.license" : b
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }

      }
    }
  },

  'click #profCountUpdateButton'(event){
    event.preventDefault();

    if($('#profCountUpdate').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const b = $('#profCountUpdate').val();

      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "studentCountInfos.profCount" : b
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }

      }
    }
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

  'click #firstPopularDepartment'(event){
    event.preventDefault();
    if($('#popularDepartment1').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        var pop = __sI.popularDepartments;

        pop[0] = $('#popularDepartment1').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "popularDepartments" : pop
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }
  },

  'click #secondPopularDepartment'(event){
    event.preventDefault();
    if($('#popularDepartment2').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        var pop = __sI.popularDepartments;

        pop[1] = $('#popularDepartment2').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "popularDepartments" : pop
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }

    }
  },

  'click #thirdPopularDepartment'(event){
    event.preventDefault();
    if($('#popularDepartment3').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        var pop = __sI.popularDepartments;

        pop[2] = $('#popularDepartment3').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "popularDepartments" : pop
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }
  },

  'click #facultyCountUpdateButton'(event){
    event.preventDefault();
    if($('#facultyCountUpdate').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#facultyCountUpdate').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "academicInfos.facultyCount" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }

  },

  'click #departmentCountUpdateButton'(event){
    if($('#departmentCountUpdate').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#departmentCountUpdate').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "academicInfos.departmentCount" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }
  },


  'click #academicScholarUpdateButton'(event){

    event.preventDefault();

    if($('#academicScholarRateHave').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#academicScholarRateHave').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "scholarShipInfos.academicScholar.quotaRate" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }

  },

  'click #academicScholarNewButton'(event){

    event.preventDefault();

    if($('#academicScholarRateNew').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#academicScholarRateNew').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "scholarShipInfos.academicScholar.isHave" : true,
            "scholarShipInfos.academicScholar.quotaRate" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }

  },

  'click #athleteScholarUpdateButton'(event){

    event.preventDefault();

    if($('#athleteScholarRateHave').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#athleteScholarRateHave').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "scholarShipInfos.athleteScholar.quotaRate" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }

  },

  'click #athleteScholarNewButton'(event){

    event.preventDefault();

    if($('#athleteScholarRateNew').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#athleteScholarRateNew').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "scholarShipInfos.athleteScholar.isHave" : true,
            "scholarShipInfos.athleteScholar.quotaRate" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }

  },

  'click #firstSelectScholarUpdateButton'(event){

    event.preventDefault();

    if($('#firstSelectScholarRateHave').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#firstSelectScholarRateHave').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "scholarShipInfos.firstSelectScholar.quotaRate" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }

  },


    'click #athleteScholarNewButton'(event){

      event.preventDefault();

      if($('#firstSelectScholarRateNew').val() == ""){
        alert("Lütfen alanı boş bırakmayınız");
        return;
      }
      else{
        const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

        const __sI = SchoolInfos.findOne({"schoolId" : s._id});

        if(__sI){

          const c = $('#firstSelectScholarRateNew').val();
          var a = SchoolInfos.update({
            "_id" : __sI._id
          },
          {
            $set : {
              "scholarShipInfos.firstSelectScholar.isHave" : true,
              "scholarShipInfos.firstSelectScholar.quotaRate" : c
            }
          })

          if(a){
            alert("Başarılı bir şekilde güncellenmiştir.");
          }
          else{
            alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
          }
        }
      }

    },

  'click #retiredScholarUpdateButton'(event){
    event.preventDefault();

    if($('#retiredScholarRateHave').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#retiredScholarRateHave').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "scholarShipInfos.retiredScholar.quotaRate" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }
  },

  'click #athleteScholarNewButton'(event){

    event.preventDefault();

    if($('#retiredScholarRateNew').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#retiredScholarRateNew').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "scholarShipInfos.retiredScholar.isHave" : true,
            "scholarShipInfos.retiredScholar.quotaRate" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }

  },

  'click #siblingScholarUpdateButton'(event){
    event.preventDefault();

    if($('#siblingScholarRateHave').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#siblingScholarRateHave').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "scholarShipInfos.siblingScholar.quotaRate" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }
  },

  'click #siblingScholarNewButton'(event){

    event.preventDefault();

    if($('#siblingScholarRateNew').val() == ""){
      alert("Lütfen alanı boş bırakmayınız");
      return;
    }
    else{
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const __sI = SchoolInfos.findOne({"schoolId" : s._id});

      if(__sI){

        const c = $('#siblingScholarRateNew').val();
        var a = SchoolInfos.update({
          "_id" : __sI._id
        },
        {
          $set : {
            "scholarShipInfos.siblingScholar.isHave" : true,
            "scholarShipInfos.siblingScholar.quotaRate" : c
          }
        })

        if(a){
          alert("Başarılı bir şekilde güncellenmiştir.");
        }
        else{
          alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    }

  },

  'click #coverUpdate'(event){
    event.preventDefault();

    filepicker.pick(
         {
            mimetype: 'image/*',
            container: 'window',
            services: ['COMPUTER'],
            language : 'tr',
            imageDim : [1500, 938]

          },
          function(Blob){

            setTimeout(() => {
              if(confirm("Kapak fotoğrafını güncellemek istediğinizden emin misiniz?")){

                const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

                const s_ = SchoolInfos.findOne({"schoolId" : s._id});

                if(s && s_){
                  const a = SchoolInfos.update({
                    "_id" : s_._id
                  }, {
                    $set : {
                      "school.schoolCover" : Blob.url
                    }
                  })

                  if(a){
                    alert("Başarılı bir şekilde güncellenmiştir.");
                  }
                  else{
                    alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
                  }
                }

              }
              else{
                alert("İşlem iptal edildi.");
              }
            }, 1000);



          },
          function(FPError){
            console.log(FPError);

          }
    );

  },

  'click #ppUpdate'(event){
      event.preventDefault();
      filepicker.pick(
           {
              mimetype: 'image/*',
              container: 'window',
              services: ['COMPUTER'],
              language : 'tr',
              imageDim : [150, 150]

            },
            function(Blob){

              setTimeout(() => {

                if(confirm("Profil fotoğrafını güncellemek istediğinizden emin misiniz?")){

                  const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

                  const s_ = SchoolInfos.findOne({"schoolId" : s._id});

                  if(s && s_){
                    const a = SchoolInfos.update({
                      "_id" : s_._id
                    }, {
                      $set : {
                        "school.schoolLogo" : Blob.url
                      }
                    })

                    if(a){
                      alert("Başarılı bir şekilde güncellenmiştir.");
                    }
                    else{
                      alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
                    }
                  }

                }
                else{
                  alert("İşlem iptal edildi.");
                }

              }, 1000);



            },
            function(FPError){
              console.log(FPError);

            }
      );
  },

  'click #schoolPhotoUpdate'(event){
      event.preventDefault();
      filepicker.pick(
           {
              mimetype: 'image/*',
              container: 'window',
              services: ['COMPUTER'],
              language : 'tr',
              imageDim : [380, 238]

            },
            function(Blob){

              setTimeout(() => {
                if(confirm("Profil fotoğrafını güncellemek istediğinizden emin misiniz?")){

                  const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

                  const s_ = SchoolInfos.findOne({"schoolId" : s._id});

                  if(s && s_){

                    const a = Schools.update({
                      "_id" : s._id
                    },
                      {
                        $set : {
                          "schoolImg" : Blob.url
                        }
                      }
                    )

                    const b = SchoolInfos.update({
                      "_id" : s_._id
                    }, {
                      $set : {
                        "school.schoolImg" : Blob.url
                      }
                    })

                    if(a && b){
                      alert("Başarılı bir şekilde güncellenmiştir.");
                    }
                    else{
                      alert("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
                    }
                  }

                }
                else{
                  alert("İşlem iptal edildi.");
                }

              }, 1000);


            },
            function(FPError){
              console.log(FPError);

            }
      );
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

    var schoolTotalPlace = $('#totalPlace').val();

    if(isEmpty(schoolTotalPlace) || schoolTotalPlace == null || schoolTotalPlace < 0){
      schoolTotalPlace = 0;
    }

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
            socialMedia : socialMedias,
            totalPlace : schoolTotalPlace
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
            imageDim : [380, 238]

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
            imageDim : [1500, 938]

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


        if(Schools.findOne({"authorizedPersonUserId" : Meteor.userId()})){

            return MessageRooms.find({"memberIds" : Schools.findOne({"authorizedPersonUserId" : Meteor.userId()})._id});
        }
        else{
          if(Meteor.user().profile.role == "Parent" || Meteor.user().profile.role == "admin"){
            return MessageRooms.find({"memberIds" : Meteor.userId()});
          }

        }

    }

  },

  messageRoomsLength(){
    if(Meteor.status().connected){
      if(Meteor.user().profile.role == "School"){

        const school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

        if(MessageRooms.find({"memberIds" : school._id}).count() > 0){

          return true;
        }
        else{

          return false;
        }
      }
      if(Meteor.user().profile.role == "Parent" || Meteor.user().profile.role == "admin"){
        if(MessageRooms.find({"memberIds" : Meteor.userId()}).count() > 0){
          return true;
        }
        else{
          return false;
        }
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
      const a = MessageRooms.findOne({"_id" : c});
      if(a){
          return a.roomTitle;
      }
    }
  },

  whoSend(c){
    if(Meteor.status().connected){

      if(c == 'ozeldeoku'){
        return 'Özelde Oku';
      }
      else{

        const a = Schools.findOne({"_id" : c});

        if(a){
          return a.schoolName;
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

    }
  },


})


Template.schoolProfileNoticeEvents.events({


})

Template.schoolProfilePhotosVideos.onRendered(() => {
  $(".owl-carousel-desktop").owlCarousel({
    items : 1,
  });

  $(".owl-carousel-mobile").owlCarousel({
    items : 1
  });
})

Template.schoolProfilePhotosVideos.helpers({
  photos(){
    if(Meteor.status().connected){
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const a = SchoolPhotos.find({"schoolId" : s._id});

      if(a){
        return {
          count : a.count(),
          photo : a
        }
      }
    }
  },

  videos(){
    if(Meteor.status().connected){
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const a = SchoolVideos.find({"schoolId" : s._id});

      if(a){
        return {
          count : a.count(),
          video : a
        }
      }
    }
  },
})

Template.schoolProfilePhotosVideos.events({

  'click .dp'(event){
    event.preventDefault();

    if(confirm("Fotoğrafı silmek istediğinize emin misiniz?")){
      SchoolPhotos.remove({"_id" : this._id});
    }
    else{
      return;
    }
  },

  'click .dv'(event){
    event.preventDefault();

    if(confirm("Videoyu silmek istediğinize emin misiniz?")){
      SchoolVideos.remove({"_id" : this._id});
    }
    else{
      return;
    }
  },

  'click #photo'(event){
    event.preventDefault();

    filepicker.pick(
         {
            mimetype: 'image/*',
            container: 'window',
            services: ['COMPUTER'],
            language : 'tr',

          },
          function(Blob){

            const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});
            setTimeout(() => {
              if(confirm(Blob.filename + " adlı dosyayı yüklemek istediğinizden emin misiniz ?")){


                SchoolPhotos.insert({
                  schoolId : s._id,
                  photoUrl : Blob.url
                })

              }
              else{
                alert("Dosya yükleme işlemi iptal oldu.");
              }

            }, 1000);

          },
          function(FPError){

          }
    );
  },

  'click #video'(event){
    event.preventDefault();

    filepicker.pick(
         {
            extensions : ['3g2','3gp','3gp2','3gpp','3gpp2','aac','ac3','eac3','ec3','f4a',
  'f4b','f4v','flv','highwinds','m4a','m4b','m4r','m4v','mkv','mov',
  'mp3','mp4','oga','ogg','ogv','ogx','ts','webm','wma','wmv'],
            container: 'window',
            services: ['COMPUTER'],
            language : 'tr',

          },
          function(Blob){
            console.log(Blob);

            const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

            setTimeout(() => {
              if(confirm(Blob.filename + " adlı dosyayı yüklemek istediğinizden emin misiniz ? ")){

                  SchoolVideos.insert({
                    schoolId : s._id,
                    videoUrl : Blob.url
                  })

              }
              else{
                alert("Dosya yükleme işlemi iptal oldu.");
              }

            }, 1000);



          },
          function(FPError){

          }
    );
  }


})

Template.schoolProfileNoticeEvents.helpers({
  events(){
    if(Meteor.status().connected){
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const a = SchoolEvents.find({schoolId : s._id});

      if(a){
        return {
          count : a.count(),
          event : a
        }
      }
    }
  },

  notices(){
    if(Meteor.status().connected){
      const s = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});

      const a = SchoolNotice.find({schoolId : s._id});

      if(a){
        return {
          count : a.count(),
          notice : a
        }
      }
    }
  }
})

Template.schoolProfileNoticeEvents.events({
  'click .dn'(event){
    event.preventDefault();

    if(confirm(this.noticeTitle + " bildirimini silmek istediğinizden emin misiniz?")){
      SchoolNotice.remove({"_id" : this._id});
    }
    else{
      return;
    }
  },

  'click .de'(event){
    event.preventDefault();

    if(confirm(this.eventTitle + " etkinliğini silmek istediğinizden emin misiniz?")){
      SchoolEvents.remove({"_id" : this._id});
    }
    else{
      return;
    }
  }

})

Template.schoolProfileMessageRead.events({
  'click #sendNewMessage'(event){
    event.preventDefault();

    if(!isEmpty($('#newMessageText').val()) && this.data()){

      const user = Meteor.user();

      if(user){
        if(user.profile.role == "Parent"){
          const obj = {
            __nMes : $('#newMessageText').val(),
            __da : this.data(),
            __seId : Meteor.userId(),

          }


          Meteor.call('_sNewM', obj, (err, result) => {
            if(err){
              alert(err.reason);
            }
            else{
              alert(result);
              $('#newMessageText').val("");
            }
          })

        }
        else if(user.profile.role == "School"){
          const school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});
          const obj = {
            __nMes : $('#newMessageText').val(),
            __da : this.data(),
            __seId : school._id,

          }


          Meteor.call('_sNewM', obj, (err, result) => {
            if(err){
              alert(err.reason);
            }
            else{
              alert(result);
              $('#newMessageText').val("");
            }
          })
        }
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

Template.registerHelper('scholarShipHave', (e) => {

  if(e){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('scholarShipHaveLength', (e) => {
  if(e.length > 0){
    return true;
  }
  else{
    return false;
  }
})
