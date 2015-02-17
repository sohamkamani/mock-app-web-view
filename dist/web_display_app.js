window.onload = init;

function init () {

  var imageSource = "dummy_data/img1.png";

  var mainImage = document.getElementById("display-image");

  var dummyJSON = {"a":1 , "b":{"a":2,"b":0}};

  var c = _.map(obj , function(item) {return item;});

  alert(c[1].a);

  mainImage.setAttribute("src", imageSource);
}