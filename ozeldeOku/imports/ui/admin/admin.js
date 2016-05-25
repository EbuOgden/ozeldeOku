import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { Schools } from '../../api/collections/schools.js'

import './admin.html';
import './adminCenter.html';
import './schoolInfo.html';


Template.admin.onRendered(() => {

})

Template.adminCenter.helpers({
  schools(){
    return Schools.find({"isValidate" : false});
  }
})

Template.adminCenter.events({
  'click .schoolRegister'(event){
    const target = event.currentTarget;

  },

  'click .schoolInfo'(event){
    const target = event.currentTarget;
    const school = Schools.findOne(target.id);

    $('#schoolInfoName').val(school.schoolName);
    $('#schoolInfoTradeName').val(school.tradeName);
    $('#schoolInfoType').val(school.schoolType);
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
