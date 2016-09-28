import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SchoolNotice = new Mongo.Collection('SchoolNotice');

SchoolNotice.attachSchema(new SimpleSchema({
  _id : {
    type : String,
    optional : false,
    denyUpdate : true
  },

  schoolId : {
    type : String,
    optional : false,
    index : 1
  },

  noticeTitle : {
    type : String,
    optional : false
  },

  noticeMessage : {
    type : String,
    optional : false
  },

  createdAt : {
    type : Date,
    optional : false,
    autoValue : function(){
      if(this.isInsert){
        return new Date;
      }
    }
  }
}), {replace : true});
