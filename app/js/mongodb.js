app.mongodb=(function(){
'use strict';
  var insertIntoMongo=function(data){
    
    if(data.hasOwnProperty('timestamp'))
      {
        data.timestamp = new Date();
      }

    var url='https://api.mongolab.com/api/1/databases/orb/collections/comment_details?apiKey=V5I7Vu0FFEfKWmcURoXs4LbGRW_INYAf';
    var promise=new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.responseType = 'json';
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = function() {

        var status = xhr.status;
        if (status === 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send(JSON.stringify(data));
    });

    promise.then(function(function_data){
      console.log('Successful !!');
    },function(status) {
      console.log('Unsuccessful!! Error status: '+status);
    });
  };

  var deleteFromMongo=function(id){
    var url='https://api.mongolab.com/api/1/databases/orb/collections/comment_details/"+id+"?apiKey=V5I7Vu0FFEfKWmcURoXs4LbGRW_INYAf';
    var promise=new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('DELETE', url, true);
      xhr.onload = function() {

        var status = xhr.status;
        if (status === 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send(null);
    });
    promise.then(function(data){
      console.log('Successful !!');
    },function(status) {
      console.log('Unsuccessful!! Error status: '+status);
    });
  };

  var fetchFormMongo=function(){
   var url='https://api.mongolab.com/api/1/databases/orb/collections/comments_details?apiKey=V5I7Vu0FFEfKWmcURoXs4LbGRW_INYAf';
   var promise=new Promise(function(resolve, reject) {
     var xhr = new XMLHttpRequest();
     xhr.open('get', url, true);
     xhr.responseType = 'json';
     xhr.setRequestHeader('content-type', 'application/json');
     xhr.onload = function() {
       var status = xhr.status;
       if (status === 200) {
         resolve(xhr.response);
       } else {
         reject(status);
       }
     };
     xhr.send();
   });

   promise.then(function(data){
    return {
      data: data
    };
  },function(status) {
   console.log('Unsuccessful!!. Error status: '+status);
 });
 };
 return{
  fetchFormMongo : fetchFormMongo,
  insertIntoMongo : insertIntoMongo,
  deleteFromMongo : deleteFromMongo
 };
})();