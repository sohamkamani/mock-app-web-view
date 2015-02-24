describe('myFunction', function() {
    'use strict';
  var getCoordsInPercentage = app.infoCenter.getCoordsInPercentage;
  var setJsonInfo = app.infoCenter.setJsonInfo;
  var getRelativeHeight = app.infoCenter.getRelativeHeight;
  beforeEach(function() {
    app.domInfo.getById = function(args) {
      return {
        offsetTop: 10,
        offsetLeft: 10,
        offsetHeight:1,
        offsetWidth : 1
      };
    };
   });


  it('should get coords', function() {
    expect(getCoordsInPercentage(20,20)).toEqual({xcord:1000,ycord:1000});
  });

   it('shoul set Json', function() {
    var a =35;
    expect(setJsonInfo(a)).toEqual(35);
  });

  
});

 