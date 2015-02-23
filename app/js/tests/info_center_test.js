describe('myFunction', function() {
    'use strict';
  var getCoordsInPercentage = app.infoCenter.getCoordsInPercentage;

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

  //will insert additional tests here later
});
