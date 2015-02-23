<<<<<<< HEAD
describe('render page', function() {
  'use strict';
  var hideHotSpots = app.renderPage.hideHotSpots;
  var restoreHotSpots = app.renderPage.restoreHotSpots;
  var addCommentBox = app.renderPage.addCommentBox;
  var img = document.createElement('img');
  var imageContainer = document.createElement('div');

  beforeEach(function() {
    app.domInfo.getFirstElementOfClass = function(args) {
      return img;
    };
    app.renderPage.deleteElementById = function(id) {};
    app.domInfo.getById = function(id) {
      switch (id) {
        case 'image-container':
          return imageContainer;
          break;
      }
    };
    app.commentPage.getCommentDetails = function(){};
    spyOn(app.commentPage,'getCommentDetails');
  });


  it('should hide hot spots', function() {
    hideHotSpots();
    expect(img.style.zIndex).toEqual('3');
  });

  it('should restore hot spots', function() {
    restoreHotSpots();
    expect(img.style.zIndex).toEqual('-1');
  });

  it('should add comment box at the appropriate location',function(){
    addCommentBox(0,0);
    expect(imageContainer.firstChild.style.top).toEqual('0%');
    expect(imageContainer.firstChild.style.left).toEqual('0%');
    expect(app.commentPage.getCommentDetails).toHaveBeenCalled();
  });

  //will insert additional tests here later
});
=======
>>>>>>> d594991034a891180e2d9d696e616d7924653e96
