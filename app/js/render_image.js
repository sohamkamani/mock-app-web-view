app.renderPage = (function() {

  'use strict';

  function render() {
    var imageContainer = document.getElementById('image-container');
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
   // imageContainer.style.height = app.infoCenter.getRelativeHeight();
    _renderImage(imageContainer, app.infoCenter.getImageUrl());
    _.map(app.infoCenter.getHotspots(), function(hotspot) {
      _renderHotspot(imageContainer, hotspot);
    });
    app.domInfo.getById('info-button').addEventListener('click',_showInfoSection);
    app.domInfo.getById('comment-button').addEventListener('click',_showCommentLayout);

  }



  

  function addCommentBox(x,y){
    var imageContainer = document.getElementById('image-container');
    var formContainer= document.createElement('div');
    var authorName = document.createElement('input');
    var comment = document.createElement('textarea');
    var button = document.createElement('input');
    formContainer.setAttribute('id', 'form-container');
    authorName.setAttribute('type', 'text');
    authorName.setAttribute('placeholder', 'Enter Name');
    authorName.setAttribute('id', 'name');
    comment.setAttribute('placeholder', 'Enter Comment');
    comment.setAttribute('id', 'comment');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'addComment');
    button.setAttribute('value', 'Add Comment');
    formContainer.appendChild(authorName);
    formContainer.appendChild(comment);
    formContainer.appendChild(button);
    formContainer.style.top=y+'%';
    formContainer.style.left=x +'%';
    imageContainer.appendChild(formContainer);
    //imageContainer.removeEventListener('click',app.commentPage.containerListener,false);
    app.commentPage.getCommentDetails();

  }


  function _renderImage(imageContainer, imageSource) {
    var mainImage = document.createElement('img');
    mainImage.classList.add('image');
    mainImage.classList.add('display-image');
    mainImage.setAttribute('src', imageSource);
    mainImage.setAttribute('id', app.infoCenter.getImageId());
    imageContainer.appendChild(mainImage);
  }



  function _renderHotspot(imageContainer, hotspot) {
    var hotspotDiv = document.createElement('div');
    var faIcon = document.createElement('i');
    faIcon.classList.add('fa');
    faIcon.classList.add('fa-circle-o');
    faIcon.classList.add('faa-burst');
    faIcon.classList.add('animated');
    faIcon.style.color = 'blue';
    faIcon.style.fontSize = '2em';
    faIcon.style.zIndex = '1';
    faIcon.style.position = 'absolute';
    faIcon.style.top = '50%';
    faIcon.style.left = '50%';
    hotspotDiv.setAttribute('id', hotspot.id);
    hotspotDiv.style.position = 'absolute';
    hotspotDiv.style.top = hotspot.t + '%';
    hotspotDiv.style.left = hotspot.l + '%';
    hotspotDiv.style.height = hotspot.h + '%';
    hotspotDiv.style.width = hotspot.w + '%';
    hotspotDiv.style.zIndex = '2';
    hotspotDiv.style.background = 'rgba(192,192,192,0)';
    hotspotDiv.appendChild(faIcon);
    hotspotDiv.addEventListener('click', function() {
      location.href = 'index.html#' + hotspot.link;
    });
    imageContainer.appendChild(hotspotDiv);
  }

  function createListNode(comment) {
    // we will simply return is object if item is not correct
    var failResponse = {
      success: false,
      message: '| ' + JSON.stringify(comment) + ' | is not a valid item, hence skipping!'
    };
     var current_image_id = app.infoCenter.getImageId();
    // cheching for correct data  type
    if (comment !== null && typeof comment === 'object') {
      //checking if required keys are available
      if (comment.hasOwnProperty('author_name') && (comment.hasOwnProperty('comment_value')) && (comment.hasOwnProperty('time_stamp')) && (comment.image_id === current_image_id)) {
        var li = document.createElement('li'),
          aname = document.createTextNode(comment.author_name),
          timeSpan = document.createElement('span'),
          time = document.createTextNode(comment.time_stamp),
          deleteComment = document.createElement('span'),
          commentp = document.createElement('p'),
          commentvalue = document.createTextNode(comment.comment_value),
          deleteValue = document.createTextNode('  X');

        li.setAttribute('id', comment._id.$oid);
        li.setAttribute('positionX', comment.position_x);
        li.setAttribute('positionY', comment.position_y);
        li.setAttribute('id', comment._id.$oid);
        deleteComment.classList.add('deleteComment');
        li.classList.add('column');
        li.appendChild(aname);
        li.appendChild(timeSpan);
        timeSpan.appendChild(time);
        timeSpan.appendChild(deleteComment);
        deleteComment.appendChild(deleteValue);
        deleteComment.setAttribute('id', comment._id.$oid);
        deleteComment.addEventListener('click', deleteCommentListener);
        commentp.appendChild(commentvalue);
        li.appendChild(commentp);
        li.addEventListener('click', flashCommentLocation);
        return {
          success: true,
          node: li
        };
      } else {
        return failResponse;
      }
    } else {
      return failResponse;
    }
  }

  function deleteCommentListener(e) {
    var id = e.target.id;
    app.mongodb.remove(id);
  }

  function flashCommentLocation(e) {
    var imageContainer = document.getElementById('image-container');
    var faIcon = document.createElement('i');
    if (document.getElementById('commentFlash') !== null) {
      var element = document.getElementById('commentFlash');
      element.parentNode.removeChild(element);
    }
    faIcon.setAttribute('id', 'commentFlash');
    faIcon.classList.add('fa');
    faIcon.classList.add('fa-circle-o');
    faIcon.classList.add('faa-burst');
    faIcon.classList.add('animated');
    faIcon.style.color = 'red';
    faIcon.style.fontSize = '2em';
    faIcon.style.zIndex = '1';
    faIcon.style.position = 'absolute';
    var top = e.target.getAttribute('positionx'); // + '%';
    console.log(top);
    faIcon.style.top = e.target.getAttribute('positiony') + '%';
    faIcon.style.left = e.target.getAttribute('positionx') + '%';
    imageContainer.appendChild(faIcon);
  }


  function displayComment() {
    _clearComments();
    var data = app.infoCenter.getCommentInfo();
    var docFrag = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var li = createListNode(data[i]);
      if (!li.success) {
        console.info(li.message);
      } else {
        docFrag.appendChild(li.node);
      }
    }

    var listNode = document.getElementById('comments');
    listNode.appendChild(docFrag);
  }

  function _clearComments() {
    var commentContainer = document.getElementById('comments');
    while (commentContainer.firstChild) {
      commentContainer.removeChild(commentContainer.firstChild);
    }
  }

  function hideHotSpots() {
    var img = document.getElementsByClassName('image')[0];
    img.style.zIndex = '1';
  }

  function restoreHotSpots() {
    var img = document.getElementsByClassName('image')[0];
    img.style.zIndex = '-1';
  }

  function _showInfoSection (e) {
    app.domInfo.getById('info-section').classList.add('make-full');
    e.target.addEventListener('click',_hideInfoSection);
    e.target.removeEventListener('click',_showInfoSection);
  }

  function _hideInfoSection (e) {
    app.domInfo.getById('info-section').classList.remove('make-full');
    e.target.addEventListener('click',_showInfoSection);
    e.target.removeEventListener('click',_hideInfoSection);
  }

  function _showCommentLayout (e) {
    app.domInfo.getById('icon-container').classList.add('comment-layout-icon');
    app.domInfo.getById('comment-container').classList.add('comment-layout-comment');
    e.target.addEventListener('click',_hideCommentLayout);
    hideHotSpots();
    e.target.removeEventListener('click',_showCommentLayout);
  }
   function _hideCommentLayout (e) {
    app.domInfo.getById('icon-container').classList.remove('comment-layout-icon');
    app.domInfo.getById('comment-container').classList.remove('comment-layout-comment');
    e.target.addEventListener('click',_showCommentLayout);
    restoreHotSpots();
    e.target.removeEventListener('click',_hideCommentLayout);
  }

  return {
    render: render,
    displayComment: displayComment,
    hideHotSpots: hideHotSpots,
    restoreHotSpots: restoreHotSpots,
    addCommentBox: addCommentBox
  };

})();
