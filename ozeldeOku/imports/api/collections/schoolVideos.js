import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SchoolVideos = new Mongo.Collection('SchoolVideos');

SchoolVideos.attachSchema(new SimpleSchema({

  schoolId : {
    type : String,
    optional : false
  },

  videoUrl : {
    type : String,
    optional : false
  },

  createdAt : {
    type : Date,
    autoValue : function(){
      if(this.isInsert){
        return new Date;
      }
    }
  }

}), {replace : true})
