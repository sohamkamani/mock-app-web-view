app.renderPage = (function() {

  'use strict';

  function render() {
    var imageContainer = document.getElementById('image-container');
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
    imageContainer.style.height = app.infoCenter.getRelativeHeight();
    _renderImage(imageContainer, app.infoCenter.getImageUrl());
    _.map(app.infoCenter.getHotspots(), function(hotspot) {
      _renderHotspot(imageContainer, hotspot);
    });

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
    faIcon.style.color = 'red';
    faIcon.style.position = 'absolute';
    faIcon.style.top = '50%';
    faIcon.style.left = '50%';
    hotspotDiv.setAttribute('id', hotspot.id);
    hotspotDiv.style.position = 'absolute';
    hotspotDiv.style.top = hotspot.t + '%';
    hotspotDiv.style.left = hotspot.l + '%';
    hotspotDiv.style.height = hotspot.h + '%';
    hotspotDiv.style.width = hotspot.w + '%';
    hotspotDiv.style.background = 'rgba(192,192,192,0.6)';
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

    // cheching for correct data  type
    if (comment !== null && typeof comment === 'object') {
      //checking if required keys are available
      if (comment.hasOwnProperty('author_name') && (comment.hasOwnProperty('comment_value')) && (comment.hasOwnProperty('time_stamp'))) {
        var li = document.createElement('li'),
          aname = document.createTextNode(comment.author_name),
          timeSpan = document.createElement('span'),
          time = document.createTextNode(comment.time_stamp),
          commentp = document.createElement('p'),
          commentvalue = document.createTextNode(comment.comment_value);

        // li.setAttribute('id',comment._id.$oid);
        li.classList.add('column');
        li.appendChild(aname);
        li.appendChild(timeSpan);
        timeSpan.appendChild(time);
        li.appendChild(commentp);
        commentp.appendChild(commentvalue);
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

  function displayComment() {
    var data = app.infoCenter.getCommentInfo();
    var docFrag = document.createDocumentFragment();

    for (var i = 0 ; i < data.length; i++) {
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


  return {
    render: render,
    displayComment: displayComment
  };

})();
