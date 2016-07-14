export const departmentQuotasInfos = {
  __departmentQuotas : [{
    departmentId : "",
    quota : 0,
    quotaFull : 0,
    quota75 : 0,
    quota50 : 0,
    quota25 : 0
  }],

  set setDepartmentQuotas(__obj_){
    this.__departmentQuotas.push({
      departmentId : __obj_.departmentId,
      quota : __obj_.quota,
      quotaFull : __obj_.quotaFull,
      quota75 : __obj_.quota75,
      quota50 : __obj_.quota50,
      quota25 : __obj_.quota25
    })
  },

  get getDepartmentQuotas(){
    return this.__departmentQuotas;
  },

  getDepartmentQuotasLength : function(){
    return (this.__departmentQuotas.length) - 1;
  }

}
