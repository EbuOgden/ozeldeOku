/* PACKAGE IMPORTS */
import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { reCAPTCHA } from 'meteor/altapp:recaptcha';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import { HTTP } from 'meteor/http';
/*          */

/* DATABASE VARIABLES IMPORTS */
import { Schools } from '../../api/collections/schools.js';
import { Dormitories } from '../../api/collections/dormitories.js';
import { News } from '../../api/collections/news.js';
//import { SchoolVideos } from '../../../imports/api/collections/schoolVideos.js';
//import { SchoolImages } from '../../../imports/api/collections/SchoolImages.js';
import { Comments } from '../../api/collections/comments.js';
import { schoolInfo } from '../../api/client/schoolClass.js';
import { userInfo } from '../../api/client/userClass.js';

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
import './aboutUs/empty.html';
import './schoolLogin.html';
/*          */

/* JAVASCRIPT IMPORTS */
import '../../../client/lib/controls.js';
import '../../startup/client/config.js';
import '../../api/client/registerHelpers.js';
import '../../api/client/clientFuncs.js'
/*          */


Template.home.events({

})

Template.home.onCreated(function homeOnCreated(){
  document.title = "Özelde Oku";

})

Template.homeLayout.events({
  'click #logoHome'(event){
    event.stopPropagation();
    event.preventDefault();
    FlowRouter.go('/');
    BlazeLayout.render('home', {top: 'homeLayout', center : 'homeCenter', bottom: 'homeBottom'});
  },

  'click #aboutUs'(event){
    event.preventDefault();
    BlazeLayout.render('home', {top: 'homeLayout', center : 'aboutUs', bottom : 'empty'});
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

  'mouseenter .dropHov'(event){
    $('.hovCenter').css('opacity', '0.7');
    $('.hovCenter').css('background', 'rgba(0, 0, 0, 0.9)');

  },

  'mouseleave .dropHov'(event){
    $('.hovCenter').css('opacity', '1.0');
    $('.hovCenter').css('background', 'rgba(250, 250, 250, 0.0)');
  },

})

Template.homeLayout.onRendered(() => {

})

Template.homeLayout.helpers({
  userRole(){
    return Meteor.user().profile.role;
  }
})


Template.homeCenter.onRendered(() => {

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

})

Template.homeCenter.events({

})

Template.homeCenter.helpers({
  school : function(){
    return Schools.find();
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
    window.scrollTo(0, 0);
    BlazeLayout.render('home', {top : 'homeLayout', center : 'map', bottom: 'homeBottom'});
  },

  'click #schoolLogin'(event){
    event.preventDefault();
    BlazeLayout.render('home', {top : 'homeLayout', center : 'schoolLogin', bottom : 'homeBottom'});
  },

  'click #preBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/Anaokulu');
  },

  'click #firstBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/İlkokul');
  },

  'click #midBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/Ortaöğretim');
  },

  'click #highBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/Lise');
  },

  'click #uniBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/Üniversite');
  },

  'click #scholarshipBottom'(event){
    event.preventDefault();
    FlowRouter.go('/burslar');
  },

  'click #dormiBottom'(event){
    event.preventDefault();
    FlowRouter.go('/okulTuru/Yurt');
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

  'click #newSchoolRegister'(event, instance){

    event.preventDefault();

    const schoolName = trimInput($('#schoolName').val());
    const tradeName = trimInput($('#tradeName').val());
    const schoolType = $('#schoolTypeSelect').val();
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
    const captchaData = grecaptcha.getResponse()

    if((isEmpty(schoolName) || isEmpty(tradeName) || isEmpty(schoolType) || isEmpty(taxNum) ||
      isEmpty(authorizePersonName) || isEmpty(authorizeCaption) || isEmpty(schoolEmail) || isEmpty(schoolrEmail) ||
      isEmpty(schoolPassword) || isEmpty(schoolrPassword) || isEmpty(schoolAddress) || isEmpty(schoolCity) ||
      isEmpty(schoolCounty) || isEmpty(schoolPhoneNum) || isEmpty(schoolFaxNum) || isEmpty(schoolWebSite) )){
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

      const __newSchoolO = new schoolInfo(schoolName, tradeName, schoolType, taxNum, authorizePersonName, authorizeCaption,
      schoolrEmail, schoolrPassword, schoolAddress, schoolCity, schoolCounty, schoolPhoneNum, schoolFaxNum, schoolWebSite);

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
