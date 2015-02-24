describe('commentpage', function() {
    'use strict';
  var getCoords = app.commentPage.getCoords;
  var img = document.createElement('img');
  var assignEventToImage = app.commentPage.assignEventToImage;
  var comment = document.createElement('div');
  var getCommentDetails = app.commentPage.getCommentDetails;


  beforeEach(function() {
    app.infoCenter.getCoordsInPercentage = function(x,y) {
      return {
        xcord:10,
        ycord:10
      };
    };
    
    app.domInfo.getFirstElementOfClass = function(args){
      return img;
    };


   app.domInfo.getById = function(args){
      return comment;
    };

    spyOn(comment,'addEventListener');
    spyOn(img,'addEventListener');

  });

  


  it('should get coords of mouse click', function() {
    expect(getCoords('click')).toEqual({xcord:10,ycord:10});
  });

  it('should assign listener', function(){
    assignEventToImage();
    expect(img.addEventListener).toHaveBeenCalled();
  });
  it('get comment details', function(){
    getCommentDetails();
    expect(comment.addEventListener).toHaveBeenCalled();
  });
 
});


 



