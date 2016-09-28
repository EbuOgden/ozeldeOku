export class schoolInfo {
  constructor(schoolName, tradeName, schoolType, schoolTypeTwo,taxNum, authorizePersonName,
     authorizeCaption, schoolEmail, schoolPassword, schoolAddress, schoolCity, schoolCounty, schoolPhoneNum,
    schoolFaxNum, schoolWebSite, schoolFoundation){
    this._schoolName = schoolName;
    this._tradeName = tradeName;
    this._schoolType = schoolType;
    this._schoolTypeT = schoolTypeTwo;
    this._taxNum= taxNum;
    this._authorizePersonName = authorizePersonName;
    this._authorizeCaption = authorizeCaption;
    this._schoolEmail = schoolEmail;
    this._schoolPassword = schoolPassword;
    this._schoolAddress = schoolAddress;
    this._schoolCity = schoolCity;
    this._schoolCounty = schoolCounty;
    this._schoolPhoneNum = schoolPhoneNum;
    this._schoolFaxNum = schoolFaxNum;
    this._schoolWebSite = schoolWebSite;
    this._schoolFoundation = schoolFoundation;
  }

  get school(){
    return this.getSchool();
  }

  getSchool(){
    const __obj = {
      __schoolName : this._schoolName,
      __tradeName : this._tradeName,
      __schoolType : this._schoolType,
      __schoolTypeT : this._schoolTypeT,
      __taxNum : this._taxNum,
      __authorizePersonName : this._authorizePersonName,
      __authorizeCaption : this._authorizeCaption,
      __schoolEmail : this._schoolEmail,
      __schoolPassword : this._schoolPassword,
      __schoolAddress : this._schoolAddress,
      __schoolCity : this._schoolCity,
      __schoolCounty : this._schoolCounty,
      __schoolPhoneNum : this._schoolPhoneNum,
      __schoolFaxNum : this._schoolFaxNum,
      __schoolWebSite : this._schoolWebSite,
      __schoolFoundation : this._schoolFoundation
    }
    return __obj;
  }

}
