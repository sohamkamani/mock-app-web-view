app.infoCenter = function() {
  var JsonInfo;

  function getJsonInfo() {
    return JsonInfo;
  }

  function setJsonInfo(newJsonInfo) {
    JsonInfo = newJsonInfo;
  }

  function getImageName () {
    var imgName = location.hash;
    // imgName === "" ? (imgName = JsonInfo.default ): (imgName = imgName.split('#')[1]);
    if(imgName === ""){
      imgName = JsonInfo.default;
    }else{
      imgName = imgName.split('#')[1];
    }
    return imgName;
  }

  return{
    getJsonInfo : getJsonInfo,
    setJsonInfo : setJsonInfo,
    getImageName : getImageName
  };
}();