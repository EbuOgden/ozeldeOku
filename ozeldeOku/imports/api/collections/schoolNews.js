import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SchoolNews = new Mongo.Collection('SchoolNews');

SchoolNews.attachSchema(new SimpleSchema({
  schoolId : {
    type : String,
    optional : false
  },

  newsTitle : {
    type : String,
    optional : false
  },

  newsContent : {
    type : String,
    optional : false
  },

  newsCreated : {
    type : String,
    optional : false,
    autoValue : function(){
      if(this.isInsert){
        return new Date;
      }
    }
  }


}))
