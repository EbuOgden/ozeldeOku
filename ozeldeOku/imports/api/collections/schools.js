import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Schools = new Mongo.Collection('Schools');

Schools.attachSchema(new SimpleSchema({
    _id : {
      type : String,
      optional : false,
      denyUpdate : true
    },

    schoolName : {
      type : String,
      max : 256,
      optional : false,
    },

    tradeName : {
      type : String,
      max : 256,
      optional : false,
    },

    schoolType : {
      type : Object,
      optional : false,
    },

    "schoolType.schoolT" : {
      type : String,
      optional : false,
    },

    "schoolType.schoolTT" : {
      type : String,
      optional : true
    },

    taxNo : {
      type : String,
      optional : false
    },

    rate : {
      type : Number,
      optional : false,
      autoValue : function(){
        if(this.isInsert){
          return 0;
        }
      }
    },

    authorizedPerson : {
      type : String,
      optional : false,
      index : 1
    },

    authorizedCaption : {
      type : String,
      optional : false
    },

    schoolEmail : {
      type : String,
      regEx : SimpleSchema.RegEx.Email,
      optional : false
    },

    schoolPassword : {
      type : String,
      optional : true
    },

    schoolAddress : {
      type : String,
      max : 1024,
      optional : false
    },

    schoolCity : {
      type : String,
      optional : false
    },

    schoolCounty : {
      type : String,
      optional : false
    },

    schoolPhoneNumber : {
      type : String,
      optional : false
    },

    schoolFaxNumber : {
      type : String,
      optional : false
    },

    schoolWebSite : {
      type : String,
      regEx : SimpleSchema.RegEx.Domain,
      optional : true
    },

    schoolFoundation : {
      type : String,
      optional : true
    },

    isValidate : {
      type : Boolean,
      optional : false,

      autoValue : function(){
        if(this.isInsert){
          return false;
        }
      }
    },

    schoolImg : {
      type : String,
      optional : true,
      autoValue : function(){
        if(this.isInsert){
          return "schoolImage.png";
        }
      }
    },

    requestTime : {
      type : Date,

      autoValue : function(){
        if(this.isInsert){
          return new Date();
        }
      }
    },

    authorizedPersonUserId : {
      type : String,
      optional : true,
      index : 1
    },

    haveSchoolDetailInfo : {
      type : Boolean,
      optional : false,

      autoValue : function(){
        if(this.isInsert){
          return false;
        }
      }
    }
}), {replace : true});
