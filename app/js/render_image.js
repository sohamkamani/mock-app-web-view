var renderPage = function() {

  var JsonInfo;

  function getJsonInfo() {
    return JsonInfo;
  }

  function setJsonInfo(newJsonInfo) {
    JsonInfo = newJsonInfo;
  }

  function render(JsonInfo) {
    imgName = location.href.split("#")[1];
    setJsonInfo(JsonInfo);
    var imageContainer = document.getElementById("image-container");
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
    renderImage(imageContainer, JsonInfo.images[imgName].filepickerurl);
    _.map(JsonInfo.images[imgName].hotspots, function(hotspot) {
      renderHotspot(imageContainer, hotspot);
    });
  }

  function renderImage(imageContainer, imageSource) {
    var mainImage = document.createElement("img");
    mainImage.classList.add("display-image");
    mainImage.setAttribute("src", imageSource);
    imageContainer.appendChild(mainImage);
  }

  function renderHotspot(imageContainer, hotspot) {
    var hotspotDiv = document.createElement('div');
    var faIcon = document.createElement('i');
    faIcon.classList.add("fa");
    faIcon.classList.add("fa-circle-o");
    faIcon.classList.add("faa-burst");
    faIcon.classList.add("animated");
    faIcon.style.color = "red";
    faIcon.style.position = "absolute";
    faIcon.style.top = "50%";
    faIcon.style.left = "50%";
    hotspotDiv.setAttribute("id", hotspot.id);
    hotspotDiv.style.position = 'absolute';
    hotspotDiv.style.top = hotspot.t + "%";
    hotspotDiv.style.left = hotspot.l + "%";
    hotspotDiv.style.height = hotspot.h + "%";
    hotspotDiv.style.width = hotspot.w + "%";
    hotspotDiv.style.background = "#676767";
    hotspotDiv.appendChild(faIcon);
    hotspotDiv.addEventListener("click", function() {
      location.href = "index.html#" + hotspot.link;
      render(getJsonInfo());
      //location.reload();

    });
    imageContainer.appendChild(hotspotDiv);
  }

  function displayComment(data) {
    var docFrag = document.createDocumentFragment();
    for (var i = 0, len = data.length; i < len; i++) {
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

  function displaycomment() {
    var flag = 1;
    var list = document.getElementById("comment-button");
    list.addEventListener('click', displaycomment, false);
    if (flag == 1) {
      makev = document.getElementById("comment-form");
      makev.style.setProperty("display", "block");
      flag = 0;
    } else {
      flag = 1;
      makev = document.getElementById("comment-form");
      makev.style.setProperty("display", "none");
    }
  }


  return {
    render: render,
    displayComment: displayComment
  };

}();
