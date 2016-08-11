import { Departments } from '../collections/departments.js';

Meteor.methods({
  depIdFromName(__name){
    this.unblock();
    if(__name == ""){
      throw new Meteor.Error('name.empty', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
    else{
      const id = Departments.findOne({"departmentName" : __name})._id;

      if(id == ""){
        throw new Meteor.Error('cant.get.department', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
      }
      else{
        return id;
      }
    }
  }
})
