describe('render page', function() {
  'use strict';
  var hideHotSpots = app.renderPage.hideHotSpots;
  var restoreHotSpots = app.renderPage.restoreHotSpots;
  var img = document.createElement('img');
  var imageContainer = document.createElement('div');

  beforeEach(function() {
    app.domInfo.getFirstElementOfClass = function(args) {
      return img;
    };
    app.renderPage.deleteElementById = function(id) {};
  });


  it('should hide hot spots', function() {
    hideHotSpots();
    expect(img.style.zIndex).toEqual('3');
  });

  it('should restore hot spots', function() {
    restoreHotSpots();
    expect(img.style.zIndex).toEqual('-1');
  });

  //will insert additional tests here later
});
