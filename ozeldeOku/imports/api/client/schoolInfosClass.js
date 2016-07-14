export const schoolInfosForComp = {
  __facultyInfos : [{
    facultyId : "",
    departmentIds : []
  }],

  set setFacultyInfos(__obj_){
    this.__facultyInfos.push({
      facultyId : __obj_.facId,
      departmentIds : __obj_.departmentIdsFrom
    });
  },

  get getFacultyInfos(){
    return this.__facultyInfos;
  },

  getFacultyInfosLength : function() {
    return (this.__facultyInfos.length) - 1;

  }

}
