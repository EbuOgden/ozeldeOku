import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SchoolInfos = new Mongo.Collection('SchoolInfos');

SchoolInfos.attachSchema(new SimpleSchema({

  schoolId : {
    type : String,
    optional : false
  },

  popularDepartments : {
    type : [String],
    optional : true
  },

  studentCountInfos : {
    type : Object,
    optional : false
  },

  "studentCountInfos.doctorate" : {
    type : Number,
    optional : true
  },

  "studentCountInfos.postGraduate" : {
    type : Number,
    optional : true
  },

  "studentCountInfos.license" : {
    type : Number,
    optional : false
  },

  "studentCountInfos.profCount" : { /* for stuCountPerProf = doctorate+post+license / profCount */
    type : Number,
    optional : false
  },

  "studentCountInfos.stuCountPerProf" : {
    type : Number,
    optional : false
  },

  academicInfos : {
    type : Object,
    optional : false
  },

  "academicInfos.faculty" : {
    type : Object,
    optional : false
  },

  "academicInfos.faculty.facultyCount" : {
    type : Number,
    optional : false
  },

  "academicInfos.faculty.departmentCount" : {
    type : Number,
    optional : false
  },

  "academicInfos.department" : {
    type : [Object],
    optional : false
  },

  "academicInfos.department.$.depId" : {
    type : String,
    optional : false
  },

  "academicInfos.department.$.quota" : {
    type : Number,
    optional : false
  },

  "academicInfos.department.$.fullScholarQuota" : {
    type : Number,
    optional : false
  },

  "academicInfos.department.$.75ScholarQuota" : {
    type : Number,
    optional : true
  },

  "academicInfos.department.$.50ScholarQuota" : {
    type : Number,
    optional : true
  },

  "academicInfos.department.$.25ScholarQuota" : {
    type : Number,
    optional : true
  },

  financialInfos : {
    type : Object,
    optional : false
  },

  "financialInfos.price" : {
    type : Number,
    optional : false
  },

  scholarShipInfos : {
    type : Object,
    optional : false
  },

  "scholarShipInfos.scholarStudentCount" : {
    type : Number,
    optional : true
  },

  "scholarShipInfos.sdfasf" : {
    type : String,
    optional : true
  },

  "scholarShipInfos.athleteScholar" : {
    type : Boolean,
    optional : false
  },

  "scholarShipInfos.siblingScholar" : {
    type : Boolean,
    optional : false
  },

  "scholarShipInfos.firstSelectScholar" : {
    type : Boolean,
    optional : false
  },

  "scholarShipInfos.retiredScholar" : {
    type : Boolean,
    optional : false
  },

  "scholarShipInfos.commonCollegeScholar" : {
    type : Boolean,
    optional : false
  },

  "scholarShipInfos.academicScholar" : {
    type : Boolean,
    optional : false
  }
}), {replace : true})
