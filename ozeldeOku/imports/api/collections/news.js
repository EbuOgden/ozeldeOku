import { Mongo } from 'meteor/mongo';
export const News = new Mongo.Collection('News');

News.attachSchema({
  newsMessage : {
    type : String,
    optional : false
  }
} , {replace : true});
