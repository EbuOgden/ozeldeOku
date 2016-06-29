import { Template } from 'meteor/templating';

import './schoolProfileSchoolInfos.html';

import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';
import { Faculties } from '/imports/api/collections/faculties.js';
import { Departments } from '/imports/api/collections/departments.js';
import { FacultyDepartments } from '/imports/api/collections/facultyDepartments.js';

import { schoolInfosForComp } from '/imports/api/client/schoolInfosClass.js'

import '../../../client/lib/chosen.jquery.min.js';

Template.schoolProfileSchoolInfos.helpers({
  firstTime(){
    if(!Schools.findOne().haveSchoolDetailInfo){
        return true;
    }
    else{
        return false;
    }
  },

  schoolInfos(){

    return SchoolInfos.find({"schoolId" : Schools.findOne()._id});

  },

  faculty(){
    return Faculties.find({});
  },

  department(){
    return Departments.find({});
  }
})

Template.schoolProfileSchoolInfos.onRendered(() => {

  if(!Schools.findOne().haveSchoolDetailInfo){
    $(".chosen-select").chosen({
      no_results_text : "Aradığınız kriterlere uygun seçenek bulunamadı",
    });

  }
  else{
    Meteor.call('getUniDepartments', Schools.findOne()._id, (err, result) => {
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

    const schoolId = Schools.findOne()._id;



    if(localInsert != ""){

      $('#uniFaculties').prop('selectedIndex',0); /* single select reset */

      $("#facDepartments option:selected").removeAttr("selected"); /* multiple select reset */

    }
    else{

    }
  },

  'click #addFacultyFinish'(event, instance){
    event.preventDefault();

  }
})
