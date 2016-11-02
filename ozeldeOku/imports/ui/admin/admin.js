import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { Schools } from '../../api/collections/schools.js';

import { HomePageCarousel } from '/imports/api/collections/homePageCarousel.js';
import { ChoosenSchools } from '/imports/api/collections/choosenSchools.js';

import './admin.html';
import './adminCenter.html';
import './schoolInfo.html';


Template.admin.onRendered(() => {
})

Template.adminCenter.helpers({
  schools(){
    return Schools.find({"isValidate" : false});
  },

  schoolsDelete(){
    return Schools.find({});
  },

  photos(){
    if(Meteor.status().connected){
      const hpc = HomePageCarousel.find({});

      if(hpc){
        return {
          photo : hpc,
          count : hpc.count()
        }
      }
    }

  },

  choosens(){
    if(Meteor.status().connected){
      const choosens = ChoosenSchools.find({}).fetch();

      if(choosens.length > 0){
        const a = [];
        const schools = [];

        for(let i = choosens.length; i--;){
          a.push(choosens[i].schoolId);
        }

        for(let i = a.length; i--;){
          schools.push(Schools.findOne({"_id" : a[i]}));
        }

        return {
          choosen : schools,
          count : choosens.length
        }
      }


    }
  },

  choose(){
    if(Meteor.status().connected){
      const schools = Schools.find({});

      if(schools){
        return {
          school : schools,
          count : schools.count()
        }
      }
    }
  }
})

Template.adminCenter.events({
  'click .schoolDelete'(event){
      event.preventDefault();

      if(confirm(this.schoolName + "'i silmek istediğinize emin misiniz?")){
        const s = Schools.findOne({"_id" : this._id});
        var s_ = SchoolInfos.findOne({"schoolId" : s._id});

        if(s){

          if(s_){
              var a = SchoolInfos.remove({"_id" : s_._id});
              if(a){
                var b = Schools.remove({"_id" : s._id});

                if(b){
                  alert("Silindi.");
                  return;
                }
              }
          }
          else{
            var b = Schools.remove({"_id" : s._id});

            if(b){
              alert("Silindi.");
              return;
            }
          }


        }


      }
      else{
        alert("İşlem iptal edildi.");
        return;
      }
  },

  'click .schoolRegister'(event){
    const target = event.currentTarget;

  },

  'click .chooseDe'(event){
    if(confirm(this.schoolName + " i silmek istediğinize emin misiniz?")){
      const a = ChoosenSchools.findOne({"schoolId" : this._id});

      ChoosenSchools.remove({"_id" : a._id});
    }
    else{
      alert("Silme iptal edildi.")
    }
  },

  'click .chooseSc'(event){

    const school = Schools.findOne({"_id" : event.currentTarget.id});

    if(confirm(school.schoolName + " i eklemek istediğinize emin misiniz?")){
      ChoosenSchools.insert({
        schoolId : school._id
      })

    }
    else{
        alert("Ekleme iptal edildi.")
    }

  },

  'click #photo1'(event){
    filepicker.pick(
         {
            mimetype: 'image/*',
            container: 'window',
            services: ['COMPUTER'],
            language : 'tr',

          },
          function(Blob){

            setTimeout(() => {
              if(confirm(Blob.filename + " adlı dosyayı yüklemek istediğinizden emin misiniz ?")){
                HomePageCarousel.insert({
                  imgUrl : Blob.url
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

  'click .adminPhoto'(event){

    if(confirm("Fotoğrafı silmek istediğinize emin misiniz?")){
        HomePageCarousel.remove({"_id" : event.currentTarget.id});
    }
    else{

    }
  },
  'click .schoolInfo'(event){
    const target = event.currentTarget;
    const school = Schools.findOne(target.id);

    $('#schoolInfoName').val(school.schoolName);
    $('#schoolInfoTradeName').val(school.tradeName);
    $('#schoolInfoType1').val(school.schoolType.schoolT);
    $('#schoolInfoType2').val(school.schoolType.schoolTT);
    $('#schoolInfoAuthorizedPerson').val(school.authorizedPerson);
    $('#schoolInfoAuthorizedCaption').val(school.authorizedCaption);
    $('#schoolInfoEmail').val(school.schoolEmail);
    $('#schoolInfoAddress').val(school.schoolAddress);
    $('#schoolInfoCity').val(school.schoolCity);
    $('#schoolInfoCounty').val(school.schoolCounty);
    $('#schoolInfoPhoneNo').val(school.schoolPhoneNumber);
    $('#schoolInfoFaxNo').val(school.schoolFaxNumber);
    $('#schoolInfoWebsite').val(school.schoolWebSite);
    $('#schoolInfoTaxNumber').val(school.taxNo);

    $('#schoolInfo').modal({
      show : true
    });

  }
})
