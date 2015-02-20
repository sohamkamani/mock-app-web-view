app.domInfo = (function(){

  'use strict';

  function getById (id) {
    return document.getElementById(id);
  }

  return{
    getById : getById
  };

})();