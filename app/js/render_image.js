window.onload = init;

function AJAX_JSON_Req(url) {
  var AJAX_req = new XMLHttpRequest();
  AJAX_req.open("GET", url, true);
  AJAX_req.setRequestHeader("Content-type", "application/json");

  AJAX_req.onreadystatechange = function() {
    if (AJAX_req.readyState == 4 && AJAX_req.status == 200) {
      var response = JSON.parse(AJAX_req.responseText);
    }
  };
  AJAX_req.send();
}


function init() {

  var imageSource = "dummy_data/img1.png";

  var mainImage = document.getElementById("display-image");

  var dummyJSON = AJAX_JSON_Req('dummy_data/dummy.json');

  var c = _.map(dummyJSON, function(item) {
    return item;
  });

  alert(c[1].a);

  mainImage.setAttribute("src", imageSource);
}
