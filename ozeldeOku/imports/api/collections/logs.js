import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Logs = new Mongo.Collection('Logs');

Logs.attachSchema(new SimpleSchema({
  schoolId : {
    type : String,
    optional : false
  },

  dormitoryId : {
    type : String,
    optional : false
  },

  logMessage : {
    type : String,
    optional : false
  },

  createdAt : {
    type : Date,
    optional : false,
    autoValue : function(){
      if(this.isInsert){
        return new Date();
      }
    }
  }
}))
