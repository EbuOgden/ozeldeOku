import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SchoolInfos = new Mongo.Collection('SchoolInfos');

SchoolInfos.attachSchema(new SimpleSchema({

  schoolId : {
    type : String,
    optional : true,
    index : 1
  },

  popularDepartments : {
    type : [String],
    optional : true
  },

  studentCountInfos : {
    type : Object,
    optional : true
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
    optional : true
  },

  "studentCountInfos.profCount" : { /* for stuCountPerProf = doctorate+post+license / profCount */
    type : Number,
    optional : true
  },

  "studentCountInfos.stuCountPerProf" : {
    type : Number,
    optional : true
  },

  academicInfos : {
    type : Object,
    optional : true
  },

  "academicInfos.facultyCount" : {
    type : Number,
    optional : true
  },

  "academicInfos.departmentCount" : {
    type : Number,
    optional : true
  },

  quotaInfos : {
    type : [Object],
    optional : true
  },

  "quotaInfos.$.departmentId" : {
    type : String,
    optional : true
  },

  "quotaInfos.$.departmentName" : {
    type : String,
    optional : true
  },

  "quotaInfos.$.quota" : {
    type : Number,
    optional : true,

  },

  "quotaInfos.$.fullScholarQuota" : {
    type : Number,
    optional : true,

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
    optional : true
  },

  "financialInfos.price" : {
    type : Number,
    optional : true
  },

  scholarShipInfos : {
    type : Object,
    optional : true
  },

  "scholarShipInfos.scholarStudentCount" : {
    type : Number,
    optional : true
  },

  "scholarShipInfos.athleteScholar" : {
    type : Object,
    optional : true
  },

  "scholarShipInfos.athleteScholar.isHave" : {
    type : Boolean,
    optional : true
  },

  "scholarShipInfos.athleteScholar.quotaRate" : {
    type : Number,
    optional : true
  },

  "scholarShipInfos.siblingScholar" : {
    type : Object,
    optional : true
  },

  "scholarShipInfos.siblingScholar.isHave" : {
    type : Boolean,
    optional : true
  },

  "scholarShipInfos.siblingScholar.quotaRate" : {
    type : Number,
    optional : true
  },

  "scholarShipInfos.firstSelectScholar" : {
    type : Object,
    optional : true
  },

  "scholarShipInfos.firstSelectScholar.isHave" : {
    type : Boolean,
    optional : true
  },

  "scholarShipInfos.firstSelectScholar.quotaRate" : {
    type : Number,
    optional : true
  },

  "scholarShipInfos.retiredScholar" : {
    type : Object,
    optional : true
  },

  "scholarShipInfos.retiredScholar.isHave" : {
    type : Boolean,
    optional : true
  },

  "scholarShipInfos.retiredScholar.quotaRate" : {
    type : Number,
    optional : true
  },

  "scholarShipInfos.academicScholar" : {
    type : Object,
    optional : true
  },

  "scholarShipInfos.academicScholar.isHave" : {
    type : Boolean,
    optional : true
  },

  "scholarShipInfos.academicScholar.quotaRate" : {
    type : Number,
    optional : true
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
