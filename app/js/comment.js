app.commentPage = (function() {
  'use strict';
  var comment_detail = {
    author_name: 'apurva',
    comment_value: 'hahahah'
  };

  var coords = {
    xcord: 0,
    ycord: 0
  };

  function getCoords(event) {
    var x = event.clientX;
    var y = event.clientY;

    coords = {
      xcord: x,
      ycord: y
    };
  }

  function clicky() {
    var li = document.getElementsByClassName('image');
    li[0].addEventListener('click', getCoords, false);
  }



  function addCommentDetails() {
    var aname = document.getElementById('name').value;
    var comment = document.getElementById('comment').value;
    comment_detail = {
      author_name: aname,
      comment_value: comment
    };
  }


  function getCommentDetails() {

    var list = document.getElementById('addComment');
    list.addEventListener('click', add, false);
  }



  function displayCommentBox() {

    var flag = 1;
    var makev;

    function displaycomment() {
      if (flag === 1) {
        makev = document.getElementById('comment-form');
        makev.style.setProperty('display', 'block');
        flag = 0;
      } else {
        flag = 1;
        makev = document.getElementById('comment-form');
        makev.style.setProperty('display', 'none');
      }
    }

    var list = document.getElementById('comment-button');
    list.addEventListener('click', displaycomment, false);



    clicky();
    getCommentDetails();

  }

  function add() {
    var field = ['image_id', 'author_name', 'comment_value', 'position_x', 'position_y', 'time_stamp'];
    var comment_details = addCommentDetails();
    var json = {};
    json.image_id = app.infoCenter.getImageId();
    json.author_name = comment_detail.author_name;
    json.comment_value = comment_detail.comment_value;
    json.position_x = coords.xcord;
    json.position_y = coords.ycord;
    json.time_stamp = app.infoCenter.getDateTime();
    app.mongodb.insertIntoMongo(json);
  }

  return {
    displayCommentBox: displayCommentBox
  };
})();
