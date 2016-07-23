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

  "academicInfos.facultyCount" : {
    type : Number,
    optional : false
  },

  "academicInfos.departmentCount" : {
    type : Number,
    optional : false
  },

  quotaInfos : {
    type : [Object],
    optional : false
  },

  "quotaInfos.$.departmentId" : {
    type : String,
    optional : false
  },

  "quotaInfos.$.quota" : {
    type : Number,
    optional : false,

  },

  "quotaInfos.$.fullScholarQuota" : {
    type : Number,
    optional : false,

  },

  "quotaInfos.$.Scholar75Quota" : {
    type : Number,
    optional : true,

  },

  "quotaInfos.$.Scholar50Quota" : {
    type : Number,
    optional : true,

  },

  "quotaInfos.$.Scholar25Quota" : {
    type : Number,
    optional : true,

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

  "scholarShipInfos.academicScholar" : {
    type : Boolean,
    optional : false
  },

  sumSalary : {
    type : String,
    optional : true
  },

  school : {
    type : Object,
    optional : true
  },

  "school.schoolImg" : {
    type : String,
    optional : true
  },

  "school.schoolName" : {
    type : String,
    optional : true
  },

  "school.schoolCity" : {
    type : String,
    optional : true
  },

  "school.schoolCounty" : {
    type : String,
    optional : true
  },

  "school.schoolType" : {
    type : String,
    optional : true
  },

  "school.schoolWebSite" : {
    type : String,
    optional : true
  }
}), {replace : true})
