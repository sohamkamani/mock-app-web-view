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
    var imgName = location.hash.split('#')[1];
    if (JsonInfo.images[imgName] === undefined) {
      return JsonInfo.images[JsonInfo.default];
    } else {
      return JsonInfo.images[imgName];
    }
    
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

    return h*100/w + '%'; 
  }

  function getDateTime(){
    var currentDate = new Date();
    return currentDate.toDateString()+' ' + currentDate.toLocaleTimeString();
  }

  function getImageId(){
    return getImage().id;
  }

  function getCoordsInPercentage (x,y) {
    var imageContainer = app.domInfo.getById('image-container');
    var offsetTop = imageContainer.offsetTop;
    var offsetLeft = imageContainer.offsetLeft;
    var offsetHeight = imageContainer.offsetHeight;
    var offsetWidth = imageContainer.offsetWidth;
    var xPercentage = (x-offsetLeft) * 100 / offsetWidth ; 
    var yPercentage = (y-offsetTop) * 100 / offsetHeight ; 
    return {
      xcord : xPercentage,
      ycord : yPercentage
    };
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
    getImageId : getImageId,
    getCoordsInPercentage : getCoordsInPercentage
  };
})();
