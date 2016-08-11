import { HTTP } from 'meteor/http';

import { DormitoryInfos } from '/imports/api/collections/dormitoryInfos.js';
import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';
import { Logs } from '/imports/api/collections/logs.js';

DormitoryInfos.find().observeChanges({
  added(id, object, field){
    const dormitoryInfos = DormitoryInfos.findOne(id);

    const dormitoryDetailInfos = dormitoryInfos.dormitory;

    const dormitoryLat = dormitoryDetailInfos.dormitoryLat;
    const dormitoryLng = dormitoryDetailInfos.dormitoryLng;

    const school = SchoolInfos.find().fetch();

    console.log("dormitoryinfos added!");

    if(school.length > 0){
        for(let i = school.length; i--;){

          const schoolInfos = school[i];
          console.log(schoolInfos._id);
          console.log("*****");
          const schoolDetailInfos = schoolInfos.school;

          const schoolLat = schoolDetailInfos.schoolLat;
          const schoolLng = schoolDetailInfos.schoolLng;

          HTTP.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + schoolLat + ', ' + schoolLng + '&destinations=' + dormitoryLat + ', ' + dormitoryLng + '&key=AIzaSyDSaZ1Tzihq0wZKBiPH05U6o3r1KxzxThQ',(statusCode, data) => {

            if(data.statusCode == 200){ /* if take successfull response */
              if(data.data.rows[0].elements[0].status != "ZERO_RESULTS"){ /* if we have distance result */
                if(data.data.rows[0].elements[0].distance.value <= 10000){ /* if distance between school and dormitory smaller than 10km */

                  console.log("nearest 10km");
                  const nearestDormy = {
                    lat : dormitoryLat,
                    lng : dormitoryLng,
                    dormiName : dormitoryDetailInfos.dormitoryName
                  }

                  SchoolInfos.update({"_id" : schoolInfos._id}, {
                    $addToSet : {
                        nearestDormitories : nearestDormy
                    }
                  })

                  Logs.insert({
                    schoolId : schoolInfos.schoolId,
                    dormitoryId : id,
                    logMessage : "Yeni eklenen yurt okulun çevresine de eklendi"
                  })
                }else{
                  console.log("NOT! nearest 10km");
                }
              }
              else{
                Logs.insert({
                  schoolId : schoolInfos.schoolId,
                  dormitoryId : id,
                  logMessage : dormitoryLat + " ve " + dormitoryLng + " ye ait data bulunamadı."
                })
              }

            }
            else{
              Logs.insert({
                schoolId : school.schoolId,
                dormitoryId : id,
                logMessage : "Status Code Not 200"
              })
            }
          })
        }
    }
    else{
      Logs.insert({
        schoolId : "NULL",
        dormitoryId : "NULL",
        logMessage : "There is no school"
      })
    }
  }
})
