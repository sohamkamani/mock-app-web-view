app.insertPage = (function() {

    var insertIntoMongo = function(data) {
      console.log(data);

        var url = "https://api.mongolab.com/api/1/databases/orb/collections/comment_details?apiKey=V5I7Vu0FFEfKWmcURoXs4LbGRW_INYAf";
        var promise = new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.responseType = 'json';
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.onload = function() {

                var status = xhr.status;
                if (status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(status);
                }
            };
            xhr.send(JSON.stringify(data));
        });

        promise.then(function(response) {
          console.log(response);
        }, function(status) {
            alert("Unsuccessful!! Error status: " + status);
        });
    };

    return {
        insertIntoMongo: insertIntoMongo
    };
})();
