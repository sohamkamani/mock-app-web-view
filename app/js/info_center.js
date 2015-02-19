app.infoCenter = (function() {
  'use strict';
  var JsonInfo;

  function getJsonInfo() {
    return JsonInfo;
  }

  function setJsonInfo(newJsonInfo) {
    JsonInfo = newJsonInfo;
  }

  function getImage() {
    var imgName = location.hash;
    // imgName === "" ? (imgName = JsonInfo.default ): (imgName = imgName.split('#')[1]);
    if (imgName === '') {
      imgName = JsonInfo.default;
    } else {
      imgName = imgName.split('#')[1];
    }
    return JsonInfo.images[imgName];
  }

  function getImageUrl() {
    return getImage().filepickerurl;
  }

  function getHotspots() {
    return getImage().hotspots;
  }

  function getRelativeHeight () {
    var w = getImage().dimensions.width;
    var h = getImage().dimensions.height;

    return w*100/h + '%'; 
  }

  return {
    getJsonInfo: getJsonInfo,
    setJsonInfo: setJsonInfo,
    getImage: getImage,
    getImageUrl: getImageUrl,
    getHotspots: getHotspots,
    getRelativeHeight : getRelativeHeight
  };
})();
