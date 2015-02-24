app.mongodb = (function () {
  'use strict';

  function promise(requestType, url, data) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(requestType, url, true);
      if (requestType === 'get' || requestType === 'POST') {
        xhr.responseType = 'json';
        xhr.setRequestHeader('content-type', 'application/json');
      }

      xhr.onload = function () {

        var status = xhr.status;
        if (status === 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      if (requestType === 'get') {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }

  function getDatabase() {
    return 'hotspots';
  }

  function getCollection() {
    return 'comment_details';
  }

  function getApiKey() {
    return 'V5I7Vu0FFEfKWmcURoXs4LbGRW_INYAf';
  }

  function makeInsertFetchUrl() {
    var database = getDatabase();
    var collections = getCollection();
    var key = getApiKey();
    var url = 'https://api.mongolab.com/api/1/databases/' + database + '/collections/' + collections + '?apiKey=' + key;
    return url;
  }

  function makeJsonFetchUrl() {
    var database = getDatabase();
    var collections = 'hotspot_details';
    var key = getApiKey();
    var url = 'https://api.mongolab.com/api/1/databases/' + database + '/collections/' + collections + '?apiKey=' + key;
    return url;
  }

  function makeRemoveUrl(id) {
    var database = getDatabase();
    var collections = getCollection();
    var key = getApiKey();
    var url = 'https://api.mongolab.com/api/1/databases/' + database + '/collections/' + collections + '/' + id + '?apiKey=' + key;
    return url;
  }

  var insert = function (data) {

    var url = makeInsertFetchUrl();
    promise('POST', url, JSON.stringify(data)).then(function (response) {
      console.log('Comment insert Successful !!');
    }, function (status) {
      console.log('Unsuccessful!! Error status: ' + status);
    });


  };

  var remove = function (id) {
    var url = makeRemoveUrl(id);
    promise('DELETE', url, null).then(function (response) {
      console.log('Comment delete Successful !!');
    }, function (status) {
      console.log('Unsuccessful!! Error status: ' + status);
    });

  };

  var fetch = function () {
    var url = makeInsertFetchUrl();
    promise('get', url, null).then(function (response) {
      console.log('Comment fetch Successful !!');
      app.infoCenter.setCommentInfo(response);
      app.renderPage.displayComment();
    }, function (status) {
      console.log('Unsuccessful!! Error status: ' + status);
    });

  };

  var fetchJsonInfo = function () {
    var url = makeJsonFetchUrl();
    promise('get', url, null).then(function (response) {
      console.log('JSON fetch Successful !!');
      app.infoCenter.setJsonInfo(response[response.length - 1]);
      app.renderPage.render();
      app.commentPage.assignEventToImage();
    }, function (status) {
      console.log('Unsuccessful!! Error status: ' + status);
    });

  };

  return {
    fetch: fetch,
    insert: insert,
    remove: remove,
    fetchJsonInfo: fetchJsonInfo
  };
})();
