import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';

Meteor.methods({
  _sch_in_d(__facultyInfos_){

    const schoolId = __facultyInfos_.school;
    const scholars = __facultyInfos_.checkedScholars; /* scholar quota infos with department ids */
    const popDeps = __facultyInfos_.popDeps; /* popular departments */
    const counts = __facultyInfos_.counts; /* student, faculty, department and professor counts */
    const sumSalary = __facultyInfos_.sumSalary;
    const schoolInfos = __facultyInfos_.schoolInfos; /* faculty ids and department ids */

    const countStudentTotal = parseInt(counts.docSCount) + parseInt(counts.masterSCount) + parseInt(counts.licenseSCount);

    var studentCountPerProf = 0;

    if(parseInt(counts.profCount) != 0){
      studentCountPerProf = countStudentTotal / parseInt(counts.profCount);
    }

    SchoolInfos.insert({
      schoolId : schoolId,
      popularDepartments : popDeps,
      studentCountInfos : {
        doctorate : parseInt(counts.docSCount),
        postGraduate : parseInt(counts.masterSCount),
        license : parseInt(counts.licenseSCount),
        profCount : parseInt(counts.profCount),
        stuCountPerProf : parseInt(studentCountPerProf)
      },
      academicInfos : {
        facultyCount : parseInt(counts.facultyCount),
        departmentCount : parseInt(counts.departmentCount),
        faculty : {
          facultyId : "a",
          department : depArrdemi /* make object and push it to an array */
        }
      },
      financialInfos : {
        price : 5
      },
      scholarShipInfos : {
        athleteScholar : true,
        siblingScholar : false,
        firstSelectScholar : true,
        retiredScholar : false,
        academicScholar : true
      },

      sumSalary : "5"
    })

  }
})
