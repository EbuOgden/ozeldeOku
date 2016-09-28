import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Logs = new Mongo.Collection('Logs');

Logs.attachSchema(new SimpleSchema({
  schoolId : {
    type : String,
    optional : false,
    index : 1
  },

  dormitoryId : {
    type : String,
    optional : false,
    index : 1
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
