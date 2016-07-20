import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';
import { FacultyDepartments } from '/imports/api/collections/facultyDepartments.js';

Meteor.methods({
  _sch_in_d(__facultyInfos_){

    const schoolId = __facultyInfos_.school; /* school Id */
    const scholars = __facultyInfos_.scholars; /* quota infos boolean */
    const popDeps = __facultyInfos_.popDeps; /* popular departments */
    const counts = __facultyInfos_.counts; /* student, faculty, department and professor counts */
    const sumSalary = __facultyInfos_.sumSalary;
    const schoolInfos = __facultyInfos_.schoolInfos; /* faculty ids and department ids (department ids is array!)*/
    const quotaInfos = __facultyInfos_.quotas; /* quota infos with department ids */

    const countStudentTotal = parseInt(counts.docSCount) + parseInt(counts.masterSCount) + parseInt(counts.licenseSCount);

    var studentCountPerProf = 0;

    if(parseInt(counts.profCount) != 0){
      studentCountPerProf = countStudentTotal / parseInt(counts.profCount);
    }

    const quotaArr = [];

    for(let i = 1; i < schoolInfos.length; i++){
        FacultyDepartments.insert({
          schoolId : schoolId,
          facultyId : schoolInfos[i].facultyId,
          departmentIds : schoolInfos[i].departmentIds
        })
    }

    for(let i = 1; i < quotaInfos.length; i++){
      const quotaObj = {
        departmentId : quotaInfos[i]._departmentId__,
        quota : parseInt(quotaInfos[i].quota),
        fullScholarQuota : parseInt(quotaInfos[i].quotaFull),
        Scholar75Quota : parseInt(quotaInfos[i].quota75),
        Scholar50Quota : parseInt(quotaInfos[i].quota50),
        Scholar25Quota : parseInt(quotaInfos[i].quota25)

      }

      quotaArr.push(quotaObj);
    }

    const insertResult = SchoolInfos.insert({
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
      },
      quotaInfos : quotaArr,
      financialInfos : {
        price : 5
      },
      scholarShipInfos : {
        athleteScholar : scholars.athleteScholar,
        siblingScholar : scholars.siblingScholar,
        firstSelectScholar : scholars.firstSelectScholar,
        retiredScholar : scholars.retiredScholar,
        academicScholar : scholars.academicScholar
      },

      sumSalary : sumSalary
    })

    if(insertResult != ""){
      const updateResult = Schools.update({"_id" : schoolId}, {
        $set : {
          haveSchoolDetailInfo : true
        }
      })

      if(updateResult != ""){
        return true;
      }
    }

  }
})
