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

    img = {
      assignEventToImage :function(args){
      img.assignEventToImage('click', app.commentPage._containerListener,false);
    }
  };
  spyOn(img, 'assignEventToImage');
  img.assignEventToImage('click', app.commentPage._containerListener,false);

   app.domInfo.getElementById = function(args){
      return comment;
    };

    comment = {
      getCommentDetails :function(args){
      comment.getCommentDetails('click', app.commentPage._add,false);
    }
  };
  spyOn(comment, 'getCommentDetails');
  comment.getCommentDetails('click', app.commentPage._add,false);

  });

  


  it('should get coords of mouse click', function() {
    expect(getCoords('click')).toEqual({xcord:10,ycord:10});
  });

  it('should assign listener', function(){
    
    expect(img.assignEventToImage).toHaveBeenCalledWith('click',app.commentPage._containerListener,false);
  });

  it('should assign listener', function(){
    
    expect(comment.getCommentDetails).toHaveBeenCalledWith('click',app.commentPage._add,false);
  });

 
});


 



