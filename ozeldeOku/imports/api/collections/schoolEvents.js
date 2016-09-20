import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SchoolEvents = new Mongo.Collection('SchoolEvents');

SchoolEvents.attachSchema(new SimpleSchema({
  schoolId : {
    type : String,
    optional : false
  },

  eventMessage : {
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
}))
