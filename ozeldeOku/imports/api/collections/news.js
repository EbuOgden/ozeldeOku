import { Mongo } from 'meteor/mongo';
export const News = new Mongo.Collection('News');

News.attachSchema({
  newsMessage : {
    type : String,
    optional : false
  },

  newsTitle : {
    type : String,
    optional : false
  },

  createdAt : {
    type : Date,
    optional : false,
    autoValue : function() {
      if(this.isInsert){
        return new Date;
      }
    }
  }

} , {replace : true});
