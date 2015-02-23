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
    app.domInfo.getById('info-button').addEventListener('click', _showInfoSection);
    app.domInfo.getById('comment-button').addEventListener('click', _showCommentLayout);

  }





  function addCommentBox(x, y) {
    var imageContainer = document.getElementById('image-container');
    var formContainer = document.createElement('div');
    var header = document.createElement('div');
    var faIcon = document.createElement('i');
    faIcon.classList.add('fa');
    faIcon.classList.add('fa-comments-o');
    var headerContent = document.createTextNode('  Comment');
    var faCloseIcon = document.createElement('i');
    faCloseIcon.classList.add('fa');
    faCloseIcon.classList.add('fa-times');
    //faCloseIcon.style.color = 'red';
    faCloseIcon.setAttribute('id', 'close-button');
    faCloseIcon.addEventListener('click', closeCommentBox);
    var authorName = document.createElement('input');
    var comment = document.createElement('textarea');
    var button = document.createElement('input');
    formContainer.setAttribute('id', 'form-container');
    header.setAttribute('id', 'form-header');
    authorName.setAttribute('type', 'text');
    authorName.setAttribute('placeholder', 'Enter Name');
    authorName.setAttribute('id', 'name');
    comment.setAttribute('placeholder', 'Enter Comment');
    comment.setAttribute('id', 'comment');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'addComment');
    button.setAttribute('value', 'Post');
    formContainer.appendChild(header);
    header.appendChild(faIcon);
    header.appendChild(headerContent);
    header.appendChild(faCloseIcon);
    formContainer.appendChild(authorName);
    formContainer.appendChild(comment);
    formContainer.appendChild(button);
    if ((x < 80) && (y < 70)) {
      formContainer.style.top = y + '%';
      formContainer.style.left = x + '%';
    } 
    else if ((x > 80) && (y < 70)) {
      x = 100 - x;
      formContainer.style.top = y + '%';
      formContainer.style.right = x + '%';
    } 
    else if ((x < 80) && (y > 70)) {
      y = 100 - y;
      formContainer.style.bottom = y + '%';
      formContainer.style.left = x + '%';
    }
    else
    {
      x = 100 - x;
       y = 100 - y;
       formContainer.style.bottom = y + '%';
      formContainer.style.right = x + '%';

    }
    imageContainer.appendChild(formContainer);
    app.commentPage.getCommentDetails();

  }

  function closeCommentBox(e) {
    var id = e.target.id;
    deleteElementById('form-container');
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
          faCloseIcon = document.createElement('i'),
          commentp = document.createElement('p'),
          commentvalue = document.createTextNode(comment.comment_value);

        li.setAttribute('id', comment._id.$oid);
        li.setAttribute('positionX', comment.position_x);
        li.setAttribute('positionY', comment.position_y);
        li.setAttribute('id', comment._id.$oid);
        faCloseIcon.classList.add('fa');
        faCloseIcon.classList.add('fa-times');
        //faCloseIcon.style.color = 'red';
        li.classList.add('column');
        li.appendChild(aname);
        li.appendChild(faCloseIcon);
        li.appendChild(timeSpan);

        timeSpan.appendChild(time);

        faCloseIcon.setAttribute('id', comment._id.$oid);
        faCloseIcon.addEventListener('click', deleteCommentListener);
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

  function deleteElementById(id) {
    var element = document.getElementById(id);
    if (element !== null) {
      element.parentNode.removeChild(element);
    }
  }

  function deleteCommentListener(e) {
    var id = e.target.id;
    app.mongodb.remove(id);
    deleteElementById(id);
  }

  function flashCommentLocation(e) {
    var imageContainer = document.getElementById('image-container');
    var faIcon = document.createElement('i');
    deleteElementById('commentFlash');
    faIcon.setAttribute('id', 'commentFlash');
    faIcon.classList.add('fa');
    faIcon.classList.add('fa-hand-o-up');
    faIcon.classList.add('bounce');
    faIcon.style.color = 'red';
    faIcon.style.fontSize = '2em';
    faIcon.style.zIndex = '3';
    faIcon.style.position = 'absolute';
    if (e.target.hasAttribute('positionX')) {
      faIcon.style.top = e.target.getAttribute('positiony') + '%';
      faIcon.style.left = e.target.getAttribute('positionx') + '%';
    } else {
      faIcon.style.top = e.target.parentNode.getAttribute('positiony') + '%';
      faIcon.style.left = e.target.parentNode.getAttribute('positionx') + '%';
    }

    imageContainer.appendChild(faIcon);
  }


  function displayComment() {
    _clearComments();
    var data = app.infoCenter.getCommentInfo();
    var docFrag = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var li = createListNode(data[i]);
      if (!li.success) {
        //console.info(li.message);
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
    img.style.zIndex = '3';
  }

  function restoreHotSpots() {
    var img = document.getElementsByClassName('image')[0];
    deleteElementById('commentFlash');
    img.style.zIndex = '-1';
  }

  function _showInfoSection(e) {
    app.domInfo.getById('info-section').classList.add('make-full');
    e.target.addEventListener('click', _hideInfoSection);
    e.target.removeEventListener('click', _showInfoSection);
  }

  function _hideInfoSection(e) {
    app.domInfo.getById('info-section').classList.remove('make-full');
    e.target.addEventListener('click', _showInfoSection);
    e.target.removeEventListener('click', _hideInfoSection);
  }

  function _showCommentLayout(e) {
    app.domInfo.getById('icon-container').classList.add('comment-layout-icon');
    app.domInfo.getById('comment-container').classList.add('comment-layout-comment');
    e.target.addEventListener('click', _hideCommentLayout);
    hideHotSpots();
    e.target.removeEventListener('click', _showCommentLayout);
  }

  function _hideCommentLayout(e) {
    app.domInfo.getById('icon-container').classList.remove('comment-layout-icon');
    app.domInfo.getById('comment-container').classList.remove('comment-layout-comment');
    e.target.addEventListener('click', _showCommentLayout);
    restoreHotSpots();
    deleteElementById('form-container');
    e.target.removeEventListener('click', _hideCommentLayout);
  }

  return {
    render: render,
    displayComment: displayComment,
    hideHotSpots: hideHotSpots,
    restoreHotSpots: restoreHotSpots,
    addCommentBox: addCommentBox,
    deleteElementById: deleteElementById
  };

})();
