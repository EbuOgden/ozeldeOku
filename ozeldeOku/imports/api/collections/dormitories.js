import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Dormitories = new Mongo.Collection('Dormitories');

Dormitories.attachSchema(new SimpleSchema({
  dormitoryName : {
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

  authorizedPerson : {
    type : String,
    optional : false
  },

  authorizedCaption : {
    type : String,
    optional : false
  },

  dormitoryEmail : {
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
