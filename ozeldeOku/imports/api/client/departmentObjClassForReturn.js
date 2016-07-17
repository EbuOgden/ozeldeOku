export const depObjForRet = {
  __depInfosMethodReturn : [{
    __departmentName_ : "",
    _departmentId__ : "",
    quota : 0,
    quotaFull : 0,
    quota75 : 0,
    quota50 : 0,
    quota25 : 0
  }],

  set setDepInfos(depObj){
    this.__depInfosMethodReturn.push({
      __departmentName_ : depObj.departmentName,
      _departmentId__ : depObj._id,
      quota : depObj.quota,
      quotaFull : depObj.quotaFull,
      quota75 : depObj.quota75,
      quota50 : depObj.quota50,
      quota25 : depObj.quota25
    });
  },

  get getDepInfos(){
    return this.__depInfosMethodReturn;
  },

}
