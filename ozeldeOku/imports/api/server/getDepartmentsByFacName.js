import { Faculties } from '../collections/faculties.js';
import { Departments } from '../collections/departments.js';

/* send facultyName and facultyInfos, take facultyId from facultyName and take departmentIds from facultyInfos by facultyId */

Meteor.methods({
  getDepartmentsByFacName(__faculty){
    this.unblock();

    const facultyName = __faculty.facultyName;

    const facultyInfosFrom = __faculty.facultyInfos;

    const deps = [];

    const facId = Faculties.findOne({"facultyName" : facultyName})._id;

    if(facId != ""){
      for(let i = 0; i < facultyInfosFrom.length; i++){
          if((facultyInfosFrom[i].facultyId) == facId ){
            depIds = facultyInfosFrom[i].departmentIds;
            break;
          }
      }

      if(depIds.length >= 1){
        for(let i = 0; i < depIds.length; i++){
            deps.push(Departments.findOne({"_id" : depIds[i]}).departmentName);
        }

        return deps;
      }
      else{
        throw new Meteor.Error('cant.get.departmentIds', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
      }


    }
    else{
      throw new Meteor.Error('cant.get.facId', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }


  }
})
