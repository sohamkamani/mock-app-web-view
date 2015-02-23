app.domInfo = (function(){

  'use strict';

  function getById (id) {
    return document.getElementById(id);
  }

  function getFirstElementOfClass(className){
    return document.getElementsByClassName(className)[0];
  }

  return{
    getById : getById,
    getFirstElementOfClass : getFirstElementOfClass
  };

})();