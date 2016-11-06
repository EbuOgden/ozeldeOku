import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Schools } from '/imports/api/collections/schools.js';

Meteor.methods({
  __dor_in_d(__dormInfos__){
    this.unblock();

    const capacity = __dormInfos__.capacity; //
    const totalPlace = __dormInfos__.totalPlace; //
    const socialMedias = __dormInfos__.socialMedia; //
    const about = __dormInfos__.about; //
    const schoolId = __dormInfos__.school; //
    const lat = __dormInfos__.lat; /* School Lat */
    const lng = __dormInfos__.lng; /* School Lng */

    const schoolLogo = __dormInfos__.logo; /* School Logo URL */
    const schoolImg = __dormInfos__.img; /* School Image URL */
    const schoolCover = __dormInfos__.cover; /* Cover Photo URL */

    const school = Schools.findOne(schoolId);

    if(schoolImg != '/schoolImage.png'){
      Schools.update({"_id" : school._id}, {
        $set : {
          schoolImg : schoolImg
        }
      })


    }

    const insertResult = SchoolInfos.insert({
      schoolId : schoolId,
      studentCountInfos : {
        license : capacity
      },
      school : {
          schoolImg : schoolImg,
          schoolLogo : schoolLogo,
          schoolCover : schoolCover,
          schoolName : school.schoolName,
          schoolCity : school.schoolCity,
          schoolCounty : school.schoolCounty,
          schoolType : school.schoolType.schoolT,
          schoolTypeT : school.schoolType.schoolTT,
          schoolWebSite : school.schoolWebSite,
          schoolLat : lat,
          schoolLng : lng,
          aboutSchool : about,
          socialMedias : socialMedias
      },
      totalPlace : totalPlace


    })

    if(insertResult){
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
      throw new Meteor.Error('cant.insert', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.")
    }

  }
})
