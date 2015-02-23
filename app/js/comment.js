app.commentPage = (function() {
  'use strict';
  var comment_detail = {
    author_name: 'apurva',
    comment_value: 'hahahah'
  };

  var coords = {
    xcord: -100,
    ycord: -100
  };

  


  function getCoords(event) {

    var x = event.clientX;
    var y = event.clientY;

    coords = app.infoCenter.getCoordsInPercentage(x, y);
    return coords;
  }

  function containerListener(e) {
    var coords = getCoords(e);
    app.renderPage.deleteElementById('form-container');
    app.renderPage.addCommentBox(coords.xcord, coords.ycord);
  }

  function assignEventToImage() {
    var image = app.domInfo.getFirstElementOfClass('image');
    image.addEventListener('click', containerListener, false);
  }


  function getImageId() {
    var img = app.domInfo.getFirstElementOfClass('image');
    var id = img.getAttribute('id');
    return {
      image_id: id
    };
  }

  function addCommentDetails() {
    var aname = app.domInfo.getById('name').value;
    var comment = app.domInfo.getById('comment').value;
    return {
      author_name: aname,
      comment_value: comment
    };
  }


  function getCommentDetails() {

    var commentList = app.domInfo.getById('addComment');
    commentList.addEventListener('click', add, false);
  }





  function add() {
    var field = ['image_id', 'author_name', 'comment_value', 'position_x', 'position_y', 'time_stamp'];
    var image = getImageId();
    var comment_detail = addCommentDetails();
    var json = {};
    json.image_id = image.image_id;
    json.author_name = comment_detail.author_name;
    json.comment_value = comment_detail.comment_value;
    json.position_x = coords.xcord;
    json.position_y = coords.ycord;
    json.time_stamp = app.infoCenter.getDateTime();

    app.mongodb.insert(json);
    app.renderPage.deleteElementById('form-container');
    app.mongodb.fetch();
  }




  return {
    assignEventToImage: assignEventToImage,
    getCoords: getCoords,

    getCommentDetails: getCommentDetails
  };
})();
