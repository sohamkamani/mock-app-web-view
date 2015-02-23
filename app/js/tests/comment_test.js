describe('getCoords', function() {
    'use strict';
  var getCoords = app.commentPage.getCoords;
  var img = document.createElement('img');
  var assignEventToImage = app.commentPage.assignEventToImage;


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
      img.assignEventToImage('click', app.commentPage.containerListener,false);
    }
  };
  spyOn(img, 'assignEventToImage');
  img.assignEventToImage('click', app.commentPage.containerListener,false);

  });

  


  it('should get coords of mouse click', function() {
    expect(getCoords('click')).toEqual({xcord:10,ycord:10});
  });

  it('should assign listener', function(){
    
    expect(img.assignEventToImage).toHaveBeenCalledWith('click',app.commentPage.containerListener,false);
  });

 
});


 



