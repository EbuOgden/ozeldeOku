import { CityCounty } from '/imports/api/collections/cityCounty.js';

Meteor.methods({
    getCounties(cityName){
      this.unblock();
      
      const counties = CityCounty.find({"city" : cityName}).fetch();
      if(counties.length == 0){
        throw new Meteor.Error('no.county.of.city', 'Üzgünüz, sistemimiz şu anda seçtiğiniz ilde aktif değildir.');
      }
      else{
        return counties[0].county;
      }

    },

    getCities(){
      this.unblock();
      const city = CityCounty.find({}).fetch();
      const cities = [];
      if(city.length == 0){

      }
      else{
        for(let i = 0; i < city.length; i++){
          cities.push(city[i].city);
        }
        return cities;
      }
    }
})
