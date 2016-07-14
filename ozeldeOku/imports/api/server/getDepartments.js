import { Departments } from '../collections/departments.js';

Meteor.methods({
  getDepartments(departmentId){
    const departmentNames = [];

    if(departmentId.length == 0){
      throw new Meteor.Error('dont.have.id', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
    else{
      for(let i = 0; i < departmentId.length; i++){
        departmentNames.push(Departments.findOne(departmentId[i]).departmentName);
      }

      return departmentNames;
    }

  },
})
