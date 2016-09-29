import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

import { SchoolInfos } from '/imports/api/collections/schoolInfos.js';

import './searchMap.html';
import './searchMapCenter.html';

const a = new ReactiveVar(0);

var markers = [];

Template.searchMapCenter.onRendered(() => {

  window.scrollTo(0, 0);

  a.set(0);

  markers = [];

  Meteor.call('getCities', (err, result) => {
    if(err){
      alert(err.reason);
    }
    else{
      const cities = result;
      for(let i = 0; i < cities.length; i++){
        $('#city').append('<option>' + cities[i] + '</option>');
      }
    }
  })

  var map = new google.maps.Map(document.getElementById('mapHere'), {
    center: {lat: 41.0082, lng: 28.9784},
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  a.set(map);

})

Template.searchMapCenter.events({
  'change #city'(event){
    const cityN = $('#city').val();
    if(isEmpty(cityN)){

    }
    else{
      $('#county').empty();

      Meteor.call('getCounties', cityN, (err, result) => {
        if(err){
          alert(err.reason);
        }
        else{
          const counties = result;
          $('#county').append('<option selected disabled> İlçe </option>');
          for(let i = 0; i < counties.length; i++){
            $('#county').append('<option>' + counties[i] + '</option>');
          }
          $('#county').append('<option>Diğer...</option>');
        }
      });
    }
  },

  'click #searchMap'(event){
    event.preventDefault();
    const cityName = $('#city').val();
    const countyName = $('#county').val();

    if(cityName == null){
      alert("Lütfen Şehir Seçiniz");
      return;
    }

    if(cityName != null && countyName == null){
      const __s = SchoolInfos.find({"school.schoolCity" : cityName});

      if(__s.count() > 0){
        const arr = __s.fetch();

        for(let i = 0; i < arr.length; i++){

          var marker = new google.maps.Marker({
                map : a.get(),
                draggable : false,
                title: arr[i].school.schoolName,
                position : {lat : Number(arr[i].school.schoolLat), lng : Number(arr[i].school.schoolLng)}
          })

          markers.push(marker);
        }

        for(let i = 0; i < arr.length; i++){

          markers[i].addListener('click', () => {
            new google.maps.InfoWindow({
              content : '<a target="_blank" class="6d61705f6f7572" href="/okulTuru/' + arr[i].school.schoolType + '/' + arr[i].school.schoolName + '?schld=' + arr[i].schoolId + '&trd=LTD&isVal=True">Detaylı Sayfaya Git</a>'
            }).open(a.get(), markers[i]);
          })
        }

        a.get().setZoom(8);
        a.get().panTo(markers[arr.length - 1].position);

      }
      else{
        a.get().setZoom(8);

        for(let i = 0; i < markers.length; i++){
          markers[i].setMap(null);
        }


        markers = [];
        alert("Aradığınız kriterlerde sonuç bulunamadı");
      }
    }

    if(cityName != null && countyName != null){
      const __s = SchoolInfos.find({"school.schoolCity" : cityName, "school.schoolCounty" : countyName});

      if(__s.count() > 0){

        const arr = __s.fetch();

        for(let i = 0; i < arr.length; i++){

          var marker = new google.maps.Marker({
                map : a.get(),
                draggable : false,
                title: arr[i].school.schoolName,
                position : {lat : Number(arr[i].school.schoolLat), lng : Number(arr[i].school.schoolLng)}
          })

          markers.push(marker);
        }

        for(let i = 0; i < arr.length; i++){

          markers[i].addListener('click', () => {
            new google.maps.InfoWindow({
              content : '<a target="_blank" class="6d61705f6f7572" href="/okulTuru/' + arr[i].school.schoolType + '/' + arr[i].school.schoolName + '?schld=' + arr[i].schoolId + '&trd=LTD&isVal=True">Detaylı Sayfaya Git</a>'
            }).open(a.get(), markers[i]);
          })
        }

        a.get().setZoom(8);
        a.get().panTo(markers[arr.length - 1].position);
      }
      else{
        a.get().setZoom(8);
        for(let i = 0; i < markers.length; i++){
          markers[i].setMap(null);
        }

        markers = [];
        alert("Aradığınız kriterlerde sonuç bulunamadı");
      }
    }
  },

  'click .6d61705f6f7572'(event){

    var _0xabf4=["\x75\x5F\x6D","\x6D\x61\x70\x4F","\x6F","\x63\x61\x6C\x6C"];Meteor[_0xabf4[3]](_0xabf4[0],_0xabf4[1],_0xabf4[2], new Date)
  }
})
