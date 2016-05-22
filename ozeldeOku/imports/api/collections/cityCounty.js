import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const CityCounty = new Mongo.Collection('CityCounty');

CityCounty.attachSchema(new SimpleSchema({
  city : {
    type : String
  },

  county : {
    type : [String]
  }
}))
