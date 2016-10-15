import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const HomePageCarousel = new Mongo.Collection('HomePageCarousel');

HomePageCarousel.attachSchema(new SimpleSchema({
  imgUrl : {
    type : String,
    optional : false
  },
}))
