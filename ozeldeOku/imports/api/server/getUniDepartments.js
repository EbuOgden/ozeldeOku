import { SchoolInfos } from '../collections/schoolInfos.js';

Meteor.methods({
  getUniDepartments(schoolId){
    this.unblock();

    const schoolInfo = SchoolInfos.find({"schoolId" : schoolId}).fetch();

    if(schoolInfo.length == 0){
      throw new Meteor.Error('cant.get.schoolInfo', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
    else{
      const departments = schoolInfo[0].department;

      if(departments.length == 0){
        throw new Meteor.Error('dont.have.department', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
      }
      else{
        return departments;
      }
    }
  }
})
