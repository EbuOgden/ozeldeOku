import { Faculties } from '/imports/api/collections/faculties.js';


Meteor.methods({
  getFaculties(__facultySets_){
    this.unblock();

    const faculties = [];

    for(let i = 1; i < __facultySets_.length; i++){
      faculties.push(Faculties.findOne({"_id" : __facultySets_[i].facultyId}).facultyName);
    }

    if(faculties.length == 0){
      throw new Meteor.Error('faculty.length.zero', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
    else{
      return faculties;
    }

  }
})
