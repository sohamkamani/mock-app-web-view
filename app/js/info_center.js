app.infoCenter = (function() {
  'use strict';
  var JsonInfo;
  var commentInfo;

  function getJsonInfo() {
    return JsonInfo;
  }

  function setJsonInfo(newJsonInfo) {
    JsonInfo = newJsonInfo;
  }

  function getCommentInfo() {
    return commentInfo;
  }

  function setCommentInfo(newCommentInfo) {
    commentInfo = newCommentInfo;
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

    return h*80/w + '%'; 
  }

  function getDateTime(){
    var currentDate = new Date();
    return currentDate.toDateString()+' ' + currentDate.toLocaleTimeString();
  }

  function getImageId(){
    return getImage().id;
  }

  return {
    getJsonInfo: getJsonInfo,
    setJsonInfo: setJsonInfo,
    getImage: getImage,
    getImageUrl: getImageUrl,
    getHotspots: getHotspots,
    getRelativeHeight : getRelativeHeight,
    getCommentInfo : getCommentInfo,
    setCommentInfo : setCommentInfo,
    getDateTime : getDateTime,
    getImageId : getImageId
  };
})();
