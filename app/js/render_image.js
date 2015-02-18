var renderPage = function() {

  function render(JsonInfo) {

    renderImage(JsonInfo.images[JsonInfo["default"]]);

    function renderImage(imgInfo) {
      var imageContainer = document.getElementById("image-container");
      while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
      }
      var imageSource = imgInfo.filepickerurl;
      var mainImage = document.createElement("img");
      mainImage.classList.add("display-image");
      mainImage.setAttribute("src", imageSource);
      imageContainer.appendChild(mainImage);

      _.map(imgInfo.hotspots, renderHotspots);

      function renderHotspots(hotspot) {
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
          renderImage(JsonInfo.images[hotspot.link]);
        });
        imageContainer.appendChild(hotspotDiv);
      }

    }
  }

  return {
    render: render
  };

}();
