/* PACKAGE IMPORTS */
import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { reCAPTCHA } from 'meteor/altapp:recaptcha';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
/*          */

/* DATABASE VARIABLES IMPORTS */
import { Schools } from '../../api/collections/schools.js';
import { Dormitories } from '../../api/collections/dormitories.js';
import { News } from '../../api/collections/news.js';
import { Faculties } from '/imports/api/collections/faculties.js';
//import { SchoolVideos } from '../../../imports/api/collections/schoolVideos.js';
//import { SchoolImages } from '../../../imports/api/collections/SchoolImages.js';
import { Comments } from '../../api/collections/comments.js';
import { schoolInfo } from '../../api/client/schoolClass.js';
import { userInfo } from '../../api/client/userClass.js';

import { Messages } from '/imports/api/collections/messages.js';

/*          */

/* HTML IMPORTS */
import './aboutUs/aboutUs.html';
import './home.html';
import './homeLayout.html';
import './homeCenter.html';
import './homeBottom.html';
import './newSchoolRegister.html';
import './licenseAgreement.html';
import './login.html';
import './forgotPassword.html';
import './signupModal.html';
import './favorites.html';
import './map.html';
import './schoolLogin.html';
/*          */

/* JAVASCRIPT IMPORTS */
import '../../../client/lib/controls.js';
import '../../startup/client/config.js';
import '../../api/client/registerHelpers.js';
import '../../api/client/clientFuncs.js'
/*          */

const __schoolStatus = new ReactiveVar();
Template.home.events({

})

Template.home.onCreated(function homeOnCreated(){
  document.title = "Özelde Oku";

})

Template.home.onRendered(() => {
  window.scrollTo(0, 0);



})

Template.homeLayout.events({
  'click #logoHome'(event){
    event.stopPropagation();
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'click #aboutUs'(event){
    //event.preventDefault();
    BlazeLayout.render('home', {top: 'homeLayout', center : 'aboutUs', bottom : 'homeBottom'});
  },

  'click #logInBut'(event){
    event.preventDefault()
    BlazeLayout.render('home', {top: 'homeLayout', center : 'login', bottom: 'homeBottom'});
  },

  'click #adminDash'(event){
    event.preventDefault();
    if(Meteor.user().profile.role == 'admin'){
      FlowRouter.go('/admin');
    }
  },

  'click #logOut'(event){
    event.preventDefault();
    Meteor.logout(() => {
      FlowRouter.go('/');
    });

  },

  'click #profilePage'(event){
    event.preventDefault();
    if(Meteor.userId()){
        FlowRouter.go('/profil');
    }

  },

  'click #schoolProfilePage'(event){
    event.preventDefault();
    if(Meteor.user().profile.role == "School"){
        FlowRouter.go('/okulProfil');
    }
  },

  'click #schoolComp'(event){
    event.preventDefault();
    FlowRouter.go('/okulKarsilastir');
  },

  'click .messagesButton'(event){
    event.preventDefault();
    if(Meteor.user().profile.role == "School"){
        FlowRouter.go('/okulProfil');
    }
    if(Meteor.user().profile.role == "Parent"){
      FlowRouter.go('profil');
    }

  },

  // 'mouseenter .dropHov'(event){
  //   $('.hovCenter').css('opacity', '0.7');
  //   $('.hovCenter').css('background', 'rgba(0, 0, 0, 0.9)');
  //
  // },
  //
  // 'mouseleave .dropHov'(event){
  //   $('.hovCenter').css('opacity', '1.0');
  //   $('.hovCenter').css('background', 'rgba(250, 250, 250, 0.0)');
  // },

})

Template.homeLayout.onRendered(() => {

})

Template.homeLayout.helpers({
  userRole(){
    if(Meteor.status().connected){
        return Meteor.user().profile.role;
    }

  },

  userName(){
    if(Meteor.status().connected){
        return Meteor.user().profile.name;
    }

  },

  unreadeMessagesCount(){
    if(Meteor.status().connected){
      if(Meteor.user().profile.role == "School"){

        const school = Schools.findOne({"authorizedPersonUserId" : Meteor.userId()});
        if(school){
            const readerId = school._id;
            return Messages.find({"readerId" : readerId, isRead : false}).count();
        }

      }
      if(Meteor.user().profile.role == "Parent"){
        return Messages.find({"readerId" : Meteor.userId(), isRead : false}).count();
      }
    }

  },
})


Template.homeCenter.onRendered(() => {

  __schoolStatus.set('allSchools');

  $('#carouselSlick').slick({
    slideInterval : 4000,
    swipe : false,
    touchMove : false,
    dots : false,
    initialSlide : 0,
    arrows : false,
    draggable : false,
    accessibility : false,
    autoplay : true
  });

  Meteor.call('getCities', (err, result) => {
    if(err){
      alert(err.reason);
    }
    else{
      const cities = result;
      for(let i = 0; i < cities.length; i++){
        $('#city').append('<option>' + cities[i] + '</option>');
      }
    }
  })

})

Template.homeCenter.events({
  'click #allSchools'(event, instance){
    event.preventDefault();
    __schoolStatus.set('allSchools');
  },

  'click #preSchools'(event){
    event.preventDefault();
    __schoolStatus.set('preSchools');
  },

  'click #eleSchools'(event){
    event.preventDefault();
    __schoolStatus.set('eleSchools');
  },

  'click #highSchools'(event){
    event.preventDefault();
    __schoolStatus.set('highSchools');
  },

  'click #universities'(event){
    event.preventDefault();
    __schoolStatus.set('universities');
  },

  'change #schoolTypeSelect'(event){
    event.preventDefault();
    const schoolType = $('#schoolTypeSelect').val();

    if(isEmpty(schoolType)){

    }
    else{

      $('#schoolTypeTwo').empty();
      if(schoolType == "Lise"){
        $('#schoolTypeTwo').append('<option>Lise </option>' );
        $('#schoolTypeTwo').append('<option>Öğretmen Lisesi </option>' );
        $('#schoolTypeTwo').append('<option>Endüstri Meslek Lisesi </option>' );
        $('#schoolTypeTwo').append('<option>Ticaret Meslek Lisesi </option>' );
        $('#schoolTypeTwo').append('<option>Teknik Lise </option>' );
        $('#schoolTypeTwo').append('<option>Kız Meslek Lisesi </option>' );
        $('#schoolTypeTwo').append('<option>Sağlık Meslek Lisesi </option>' );
        $('#schoolTypeTwo').append('<option>Otelcilik ve Turizm Meslek Lisesi </option>' );
      }
      else{
        $('#schoolTypeTwo').append('<option selected disabled></option>' );
      }
    }
  },

  'change #city'(event){
    const cityN = $('#city').val();
    if(isEmpty(cityN)){

    }
    else{
      $('#county').empty();

      Meteor.call('getCounties', cityN, (err, result) => {
        if(err){
          alert(err.reason);
        }
        else{
          const counties = result;
          $('#county').append('<option selected disabled> İlçe </option>');
          for(let i = 0; i < counties.length; i++){
            $('#county').append('<option>' + counties[i] + '</option>');
          }
          $('#county').append('<option>Diğer...</option>');
        }
      });
    }
  },

  'click #searchSchool'(event){
    event.preventDefault();

    const schoolType = $('#schoolTypeSelect').val();
    const schoolTypeTwo = $('#schoolTypeTwo').val();
    const city = $('#city').val();
    const county = $('#county').val();
    const schoolName = $('#schoolNameS').val();

    if(city == null){
      alert("Lütfen şehir seçiniz.")
      return;
    }

    if(city != null && county == null){
      alert("Lütfen ilçe seçiniz.")
      return;
    }

    if(schoolTypeTwo == null && isEmpty(schoolName)){

      FlowRouter.go('/aramaSonuclari?okulTuru=' + schoolType + "&sehir=" + city + "&ilce=" + county);
      return;
    }
    else if(schoolTypeTwo == null && !isEmpty(schoolName)){

      FlowRouter.go('/aramaSonuclari?okulTuru=' + schoolType + "&sehir=" + city + "&ilce=" + county + "&okulIsmi=" + schoolName);
      return;
    }
    else if(schoolTypeTwo != null && isEmpty(schoolName)){

      FlowRouter.go('/aramaSonuclari?okulTuru=' + schoolType + "&okulTuruT=" + schoolTypeTwo + "&sehir=" + city + "&ilce=" + county);
      return;
    }
    else if(schoolTypeTwo != null && !isEmpty(schoolName)){

      FlowRouter.go('/aramaSonuclari?okulTuru=' + schoolType + "&okulTuruT=" + schoolTypeTwo + "&sehir=" + city + "&ilce=" + county + "&okulIsmi=" + schoolName);
      return;
    }


  },

  'click #searchMap'(event){
    event.preventDefault();
    FlowRouter.go('/haritadaAra');
  }

})

Template.homeCenter.helpers({
  school(){
    if(Meteor.status().connected){
        switch(__schoolStatus.get()){
          case 'allSchools':
              return Schools.find({"haveSchoolDetailInfo" : true}, {sort : {rate : -1}}, {limit : 6});
              break;

          case 'preSchools':
              return Schools.find({"schoolType.schoolT" : "Anaokulu", "haveSchoolDetailInfo" : true}, {sort : {rate : -1}}, {limit : 6});
              break;

          case 'eleSchools':
              return Schools.find({"schoolType.schoolT" : "İlkokul", "haveSchoolDetailInfo" : true}, {sort : {rate : -1}}, {limit : 6});
              break;

          case 'highSchools':
              return Schools.find({"schoolType.schoolT" : "Lise", "haveSchoolDetailInfo" : true}, {sort : {rate : -1}}, {limit : 6});
              break;

          case 'universities':

              return Schools.find({"schoolType.schoolT" : "Üniversite", "haveSchoolDetailInfo" : true}, {sort : {rate : -1}}, {limit : 6});
              break;


        }

    }

  }
})

Template.homeBottom.events({
  'click #toHome'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },
  'click #aboutUs'(event, instance){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'aboutUs', bottom: 'homeBottom'});
  },
  'click #newSchoolReg'(event){
    FlowRouter.go('/');
    window.scrollTo(0, 0);
    BlazeLayout.render('home', {top: 'homeLayout', center : 'newSchoolRegister', bottom: 'homeBottom'});
  },

  'click #touchU'(event){
    event.preventDefault();
    BlazeLayout.render('home', {top : 'homeLayout', center : 'map', bottom: 'homeBottom'});
    window.scrollTo(0, 0);
  },

  'click #schoolLogin'(event){
    event.preventDefault();
    BlazeLayout.render('home', {top : 'homeLayout', center : 'schoolLogin', bottom : 'homeBottom'});
    window.scrollTo(0, 0);
  },

  'click #preBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/Anaokulu');
    window.scrollTo(0, 0);
  },

  'click #firstBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/İlkokul');
    window.scrollTo(0, 0);
  },

  'click #midBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/Ortaöğretim');
    window.scrollTo(0, 0);
  },

  'click #highBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/Lise');
    window.scrollTo(0, 0);
  },

  'click #uniBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/Üniversite');
    window.scrollTo(0, 0);
  },

  'click #scholarshipBottom'(event){
    event.preventDefault();
    FlowRouter.go('/burslar');
    window.scrollTo(0, 0);
  },

  'click #dormiBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/Yurt');
    window.scrollTo(0, 0);
  },

  'click #mailSendBottom'(event){
    event.preventDefault();
    window.location.href = "mailto:destek@ozeldeoku.com";
  }

})

Template.newSchoolRegister.onRendered(() => {
  Meteor.call('getCities', (err, result) => {
    if(err){
      alert(err.reason);
    }
    else{
      const cities = result;
      for(let i = 0; i < cities.length; i++){
        $('#city').append('<option>' + cities[i] + '</option>');
      }
    }
  })
})


Template.newSchoolRegister.events({
  'click #anaSayfaRoute'(event){
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'change #city'(event){
    const cityN = $('#city').val();
    if(isEmpty(cityN)){

    }
    else{
      $('#county').empty();

      Meteor.call('getCounties', cityN, (err, result) => {
        if(err){
          alert(err.reason);
        }
        else{
          const counties = result;
          for(let i = 0; i < counties.length; i++){
            $('#county').append('<option>' + counties[i] + '</option>');
          }
          $('#county').append('<option>Diğer...</option>');
        }
      });
    }
  },

  'change #county'(event){
      const countyVal = $('#county').val();

      if(isEqual(countyVal, "Diğer...")){
      }
  },

  'change #schoolTypeSelect'(event){
    const schoolType = $('#schoolTypeSelect').val();

    $('#schoolTypeTwo').empty();
    if(schoolType == "Lise"){
      $('#schoolTypeTwo').append('<option>Lise </option>' );
      $('#schoolTypeTwo').append('<option>Öğretmen Lisesi </option>' );
      $('#schoolTypeTwo').append('<option>Endüstri Meslek Lisesi </option>' );
      $('#schoolTypeTwo').append('<option>Ticaret Meslek Lisesi </option>' );
      $('#schoolTypeTwo').append('<option>Teknik Lise </option>' );
      $('#schoolTypeTwo').append('<option>Kız Meslek Lisesi </option>' );
      $('#schoolTypeTwo').append('<option>Sağlık Meslek Lisesi </option>' );
      $('#schoolTypeTwo').append('<option>Otelcilik ve Turizm Meslek Lisesi </option>' );
    }
    else if(schoolType == "Üniversite"){
      $('#schoolTypeTwo').append('<option>Lisans </option>' );
      $('#schoolTypeTwo').append('<option>Ön Lisans </option>' );
    }

  },

  'click #newSchoolRegister'(event, instance){

    event.preventDefault();

    const schoolName = trimInput($('#schoolName').val());
    const tradeName = trimInput($('#tradeName').val());
    const schoolType = $('#schoolTypeSelect').val();
    const schoolTypeTwo = $('#schoolTypeTwo').val();
    const taxNum = trimInput($('#taxNum').val());
    const authorizePersonName = trimInput($('#authorizePersonName').val());
    const authorizeCaption = trimInput($('#authorizeCaption').val());
    const schoolEmail = trimInput($('#schoolEmail').val());
    const schoolrEmail = trimInput($('#schoolrEmail').val());
    const schoolPassword = $('#schoolPassword').val();
    const schoolrPassword = $('#schoolrPassword').val();
    const schoolAddress = trimInput($('#schoolAddress').val());
    const schoolCity = $('#city').val();
    const schoolCounty = $('#county').val();
    const schoolPhoneNum = $('#schoolPhoneNum').val();
    const schoolFaxNum = $('#schoolFaxNum').val();
    const schoolWebSite = $('#schoolWebSite').val();
    const schoolFoundation = $('#schoolFoundationyear').val();
    const captchaData = grecaptcha.getResponse()

    if((isEmpty(schoolName) || isEmpty(tradeName) || isEmpty(schoolType) || isEmpty(taxNum) ||
      isEmpty(authorizePersonName) || isEmpty(authorizeCaption) || isEmpty(schoolEmail) || isEmpty(schoolrEmail) ||
      isEmpty(schoolPassword) || isEmpty(schoolrPassword) || isEmpty(schoolAddress) || isEmpty(schoolCity) ||
      isEmpty(schoolCounty) || isEmpty(schoolPhoneNum) || isEmpty(schoolFaxNum) || isEmpty(schoolWebSite)  || isEmpty(schoolFoundation))){
        alert("Lütfen tüm alanları doldurunuz!");
        return;
    }

    if(!$('#agreementCheck').prop('checked')){
      alert("Lütfen üyelik sözleşmesini kabul ediniz!");
      return;
    }

    // if(isEmpty(captchaData)){
    //   alert("Lütfen Captcha işlemini yapınız!");
    //   return;
    // }

    if(isEqual(schoolEmail, schoolrEmail)){
      if(isEmail(schoolrEmail)){
      }
      else{
        alert("Girdiğiniz e-mail geçersizdir. Lütfen kontrol ediniz.");
        return;
      }
    }
    else{
      alert("Girdiğiniz e-mailler eşit değildir. Lütfen kontrol ediniz.");
      return;
    }


    if(isEqual(schoolPassword, schoolrPassword)){

      const __newSchoolO = new schoolInfo(schoolName, tradeName, schoolType, schoolTypeTwo, taxNum, authorizePersonName, authorizeCaption,
      schoolrEmail, schoolrPassword, schoolAddress, schoolCity, schoolCounty, schoolPhoneNum, schoolFaxNum, schoolWebSite, schoolFoundation);

      const _schoolN = __newSchoolO.school;

      Meteor.call('encryptPass', _schoolN, (err, result) => {
        if(err){
          alert(err.reason);
        }
        else{
          Meteor.call('recaptchControl', captchaData, _schoolN, result, (err, result) => {

            grecaptcha.reset();

            if(err){
              alert(err.reason);
            }
            else{
              document.getElementById("newSchoolRegisterForm").reset();
              alert("Başvurunuz başarıyla alınmıştır.");
            }
          })
        }
      })


    }
    else{
      alert("Girdiğiniz şifreler eşit değildir. Lütfen kontrol ediniz.");
      return;
    }

  }
})

Template.login.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },
})

Template.login.events({
  'click #loginUser'(event){

    event.preventDefault();

    const email = $('#usrEmail').val();
    const password = $('#usrPassword').val();

    if(isEmpty(email) || isEmpty(password)){
      alert("Lütfen tüm alanları doldurunuz");
      return;
    }

    Meteor.loginWithPassword(email, password, (err) => {
      if(err){
        if(err.error == 403){
          alert("Kullanıcı bulunamadı");
        }
        else{
          alert("Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
      else{
        BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
      }
    })
  }
})

Template.map.onRendered(() => {

  var map = new google.maps.Map(document.getElementById('mapHere'), {
    center: {lat: 41.0082, lng: 28.9784},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

})

Template.map.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'click #mailSend'(event){
    event.preventDefault();
    window.location.href = "mailto:bilgi@ozeldeoku.com";
  }
})

Template.schoolLogin.onRendered(() => {
  if(Meteor.userId()){
    if(confirm("Üyelik girişi yapılmış durumda. Çıkış yapmak istiyor musunuz ?")){
        Meteor.logout();
    }
    else{
        BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
    }
  }
})

Template.schoolLogin.events({
  'click #anaSayfaRoute'(event){
    event.preventDefault();
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'submit #schoolLogin, click #schoolLoginButton'(event){
    event.preventDefault();

    const email = $('#schoolEmail').val();
    const password = $('#schoolPassword').val();

    if(isEmpty(email) || isEmpty(password)){
      alert("Lütfen tüm alanları doldurunuz");
      return;
    }

    Meteor.loginWithPassword(email, password, (err) => {
      if(err){
        if(err.error == 403){
          alert("Kullanıcı bulunamadı");
        }
        else{
          alert("Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
      else{
        BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
      }
    })
  },

})
