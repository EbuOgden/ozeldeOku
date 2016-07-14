export const depObjForRet = {
  __depInfosMethodReturn : [{
    __departmentName_ : "",
    _departmentId__ : ""
  }],

  set setDepInfos(depObj){
    this.__depInfosMethodReturn.push({
      __departmentName_ : depObj.departmentName,
      _departmentId__ : depObj._id
    });
  },

  get getDepInfos(){
    return this.__depInfosMethodReturn;
  },


}
