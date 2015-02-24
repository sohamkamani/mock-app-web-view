describe('render page', function() {
  'use strict';
  var hideHotSpots = app.renderPage.hideHotSpots;
  var restoreHotSpots = app.renderPage.restoreHotSpots;
  var addCommentBox = app.renderPage.addCommentBox;
  var displayComment = app.renderPage.displayComment;
  var render = app.renderPage.render;
  var img = document.createElement('img');
  var imageContainer = document.createElement('div');
  var commentContainer = document.createElement('ul');

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
        case 'comments':
          return commentContainer;
          break;
        default:
          return document.createElement('div');

      };
    };

    app.infoCenter.getImageUrl = function() {
      return 'dummyUrl';
    };

    app.infoCenter.getImageId = function() {
      return 'dummyId';
    };

    app.infoCenter.getCommentInfo = function() {
      return [{
        "_id": {
          "$oid": "54eacedfe4b01ec4150fa141"
        },
        "image_id": "dummyId",
        "author_name": "Mayanka",
        "comment_value": "Super bad!!",
        "position_x": 56,
        "position_y": 16,
        "time_stamp": "Mon Feb 23 2015 12:26:35 PM"
      }];
    };

    app.infoCenter.getHotspots = function() {
      return {
        'hp1': {
          'id': 'dummy',
          't': 1,
          'l': 1,
          'h': 1,
          'w': 1,
          'link': 'dummy'
        }
      };
    };

    app.commentPage.getCommentDetails = function() {};
    spyOn(app.commentPage, 'getCommentDetails');
    spyOn(commentContainer,'appendChild');
  });

  afterEach(function() {
    imageContainer = document.createElement('div');
  });


  it('should hide hot spots', function() {
    hideHotSpots();
    expect(img.style.zIndex).toEqual('3');
  });

  it('should restore hot spots', function() {
    restoreHotSpots();
    expect(img.style.zIndex).toEqual('-1');
  });

  it('should add comment box at the appropriate location with x>80,y<70', function() {
    addCommentBox(90, 0);
    expect(imageContainer.firstChild.style.top).toEqual('0%');
    expect(imageContainer.firstChild.style.right).toEqual('10%');
    expect(app.commentPage.getCommentDetails).toHaveBeenCalled();
  });

  it('should add comment box at the appropriate location', function() {
    addCommentBox(0, 0);
    expect(imageContainer.firstChild.style.top).toEqual('0%');
    expect(imageContainer.firstChild.style.left).toEqual('0%');
    expect(app.commentPage.getCommentDetails).toHaveBeenCalled();
  });

  it('should add comment box at the appropriate location with x>80,y>70', function() {
    addCommentBox(90, 90);
    expect(imageContainer.firstChild.style.bottom).toEqual('10%');
    expect(imageContainer.firstChild.style.right).toEqual('10%');
    expect(app.commentPage.getCommentDetails).toHaveBeenCalled();
  });

  it('should add comment box at the appropriate location with x<80,y>70', function() {
    addCommentBox(79, 90);
    expect(imageContainer.firstChild.style.bottom).toEqual('10%');
    expect(imageContainer.firstChild.style.left).toEqual('79%');
    expect(app.commentPage.getCommentDetails).toHaveBeenCalled();
  });

  it('should render the page', function() {
    render();
    expect(imageContainer.childNodes[0].id).toEqual('dummyId');
  });

  it('should display comment info', function() {
    displayComment();
    expect(commentContainer.appendChild).toHaveBeenCalled();
    expect(commentContainer.firstChild).not.toEqual(null);
  });


  //will insert additional tests here later
});
