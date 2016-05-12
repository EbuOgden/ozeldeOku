import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Schools = new Mongo.Collection('Schools');

Schools.attachSchema(new SimpleSchema({
    schoolName : {
      type : String,
      max : 256,
      optional : false,
    },

    businessName : {
      type : String,
      max : 256,
      optional : false,
    },

    type : {
      type : String,
      optional : false
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
      optional : false
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

    address : {
      type : String,
      max : 512,
      optional : false
    },

    city : {
      type : String,
      optional : false
    },

    county : {
      type : String,
      optional : false
    },

    webSite : {
      type : String,
      regEx : SimpleSchema.RegEx.Domain
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

    requestTime : {
      type : Date,

      autoValue : function(){
        if(this.isInsert){
          return new Date();
        }
      }
    }
}), {replace : true});
