import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SchoolInfos = new Mongo.Collection('SchoolInfos');

SchoolInfos.attachSchema(new SimpleSchema({

  schoolId : {
    type : String,
    optional : false,
    index : 1
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

  "quotaInfos.$.departmentName" : {
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
    type : Object,
    optional : false
  },

  "scholarShipInfos.athleteScholar.isHave" : {
    type : Boolean,
    optional : false
  },

  "scholarShipInfos.athleteScholar.quotaRate" : {
    type : Number,
    optional : false
  },

  "scholarShipInfos.siblingScholar" : {
    type : Object,
    optional : false
  },

  "scholarShipInfos.siblingScholar.isHave" : {
    type : Boolean,
    optional : false
  },

  "scholarShipInfos.siblingScholar.quotaRate" : {
    type : Number,
    optional : false
  },

  "scholarShipInfos.firstSelectScholar" : {
    type : Object,
    optional : false
  },

  "scholarShipInfos.firstSelectScholar.isHave" : {
    type : Boolean,
    optional : false
  },

  "scholarShipInfos.firstSelectScholar.quotaRate" : {
    type : Number,
    optional : false
  },

  "scholarShipInfos.retiredScholar" : {
    type : Object,
    optional : false
  },

  "scholarShipInfos.retiredScholar.isHave" : {
    type : Boolean,
    optional : false
  },

  "scholarShipInfos.retiredScholar.quotaRate" : {
    type : Number,
    optional : false
  },

  "scholarShipInfos.academicScholar" : {
    type : Object,
    optional : false
  },

  "scholarShipInfos.academicScholar.isHave" : {
    type : Boolean,
    optional : false
  },

  "scholarShipInfos.academicScholar.quotaRate" : {
    type : Number,
    optional : false
  },

  "scholarShipInfos.others" : {
    type : [Object],
    optional : true
  },

  "scholarShipInfos.others.$.otherScholarName" : {
    type : String,
    optional : true
  },

  "scholarShipInfos.others.$.quotaRate" : {
    type : Number,
    optional : true
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

  "school.schoolTypeT" : {
    type : String,
    optional : true
  },

  "school.schoolWebSite" : {
    type : String,
    optional : true
  },

  "school.schoolLat" : {
    type : String,
    optional : true,
  },

  "school.schoolLng" : {
    type : String,
    optional : true,
  },

  "school.aboutSchool" : {
    type : String,
    optional : true
  },

  "school.schoolLogo" : {
    type : String,
    optional : true
  },

  "school.schoolCover" : {
    type : String,
    optional : true
  },

  "school.socialMedias" : {
    type : [String],
    optional : true
  },

  nearestDormitories : {
    type : [Object],
    optional : true,

      autoValue : function(){
        if(this.isInsert){
          const nearestDormy = [
            {
              lat : "",
              lng : "",
              dormiName : ""
            }
          ]

          return nearestDormy;
        }
      }
  },

  "nearestDormitories.$.lat" : {
    type : String,
    optional : true
  },

  "nearestDormitories.$.lng" : {
    type : String,
    optional : true
  },

  "nearestDormitories.$.dormiName" : {
    type : String,
    optional : true
  },

  totalPlace : {
    type : String,
    optional : true
  }


}), {replace : true})
