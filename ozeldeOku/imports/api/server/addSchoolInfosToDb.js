import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';
import { FacultyDepartments } from '/imports/api/collections/facultyDepartments.js';

Meteor.methods({
  _sch_in_d(__facultyInfos_){
    this.unblock();

    const schoolId = __facultyInfos_.school; /* school Id */
    const scholars = __facultyInfos_.scholars; /* quota infos boolean */
    const popDeps = __facultyInfos_.popDeps; /* popular departments */
    const counts = __facultyInfos_.counts; /* student, faculty, department and professor counts */
    const sumSalary = __facultyInfos_.sumSalary;
    const schoolInfos = __facultyInfos_.schoolInfos; /* faculty ids and department ids (department ids is array!)*/
    const quotaInfos = __facultyInfos_.quotas; /* quota infos with department ids */
    const aboutSchool = __facultyInfos_.about; /* About School */
    const lat = __facultyInfos_.lat;
    const lng = __facultyInfos_.lng;
    const schoolLogo = __facultyInfos_.logo;
    const schoolImg = __facultyInfos_.img;
    const schoolCover = __facultyInfos_.cover;

    const otherQuotaInfos = __facultyInfos_.otherQuotas;

    const school = Schools.findOne(schoolId);

    if(schoolImg != '/schoolImage.png'){
      Schools.update({"_id" : school._id}, {
        $set : {
          schoolImg : schoolImg
        }
      })


    }

    const countStudentTotal = parseInt(counts.docSCount) + parseInt(counts.masterSCount) + parseInt(counts.licenseSCount);

    var studentCountPerProf = 0;

    if(parseInt(counts.profCount) != 0){
      studentCountPerProf = countStudentTotal / parseInt(counts.profCount);
    }

    const otherQuotaArr = [];
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
        departmentName : quotaInfos[i].__departmentName_,
        quota : parseInt(quotaInfos[i].quota),
        fullScholarQuota : parseInt(quotaInfos[i].quotaFull),
        Scholar75Quota : parseInt(quotaInfos[i].quota75),
        Scholar50Quota : parseInt(quotaInfos[i].quota50),
        Scholar25Quota : parseInt(quotaInfos[i].quota25)

      }

      quotaArr.push(quotaObj);
    }

    if(otherQuotaInfos != 1){
        for(let i = 1; i < otherQuotaInfos.length; i++){

          const otherQuotaObj = {
            otherScholarName : otherQuotaInfos[i].__otherScholarName,
            quotaRate : otherQuotaInfos[i]._otherScholarRate__

          }
          otherQuotaArr.push(otherQuotaObj);
        }
    }

    for(var key in scholars){
      if(scholars[key].quotaRate == "" || scholars[key].quotaRate === "") { scholars[key].quotaRate = 0}
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
        athleteScholar : {
            isHave : scholars.athleteScholar.isHave,
            quotaRate : parseInt(scholars.athleteScholar.quotaRate)
        },
        siblingScholar : {
          isHave : scholars.siblingScholar.isHave,
          quotaRate : parseInt(scholars.siblingScholar.quotaRate)
        },

        firstSelectScholar : {
          isHave : scholars.firstSelectScholar.isHave,
          quotaRate : parseInt(scholars.firstSelectScholar.quotaRate)
        },

        retiredScholar : {
          isHave : scholars.retiredScholar.isHave,
          quotaRate : parseInt(scholars.retiredScholar.quotaRate)
        },
        academicScholar : {
          isHave : scholars.academicScholar.isHave,
          quotaRate : parseInt(scholars.academicScholar.quotaRate)
        },

        others : otherQuotaArr
      },

      school : {
          schoolImg : schoolImg,
          schoolLogo : schoolLogo,
          schoolCover : schoolCover,
          schoolName : school.schoolName,
          schoolCity : school.schoolCity,
          schoolCounty : school.schoolCounty,
          schoolType : school.schoolType,
          schoolWebSite : school.schoolWebSite,
          schoolLat : lat,
          schoolLng : lng,
          aboutSchool : aboutSchool,
      },
      sumSalary : sumSalary,

    })

    if(insertResult != ""){
      const updateResult = Schools.update({"_id" : schoolId}, {
        $set : {
          haveSchoolDetailInfo : true
        }
      })

      if(updateResult != ""){
        return "Bilgileriniz başarılı bir şekilde sistemimize eklenmiştir.";
      }
      else{
        SchoolInfos.remove({"_id" : insertResult});
        throw new Meteor.Error('cant.insert.detailInfo', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
      }
    }
    else{
      throw new Meteor.Error('cant.insert.detailInfo', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }

  }
})
