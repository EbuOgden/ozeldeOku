import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';

Meteor.methods({
  _cord__Upd_(__new_Loc, __schoolId_){
    this.unblock();
    
    const markerNewLoc = __new_Loc;

    var updateResult = SchoolInfos.update({"schoolId" : __schoolId_}, {
      $set : {
          "school.schoolLat" : markerNewLoc.newLat,
          "school.schoolLng" : markerNewLoc.newLng
      }
    })

    if(updateResult != 1){
      throw new Meteor.Error('cant.update.school.location', "Teknik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz");
    }
  }
})
