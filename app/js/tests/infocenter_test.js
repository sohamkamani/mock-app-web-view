describe('infoCenter', function() {
    'use strict';
  var getjsonInfo = app.infoCenter.getjsonInfo;

  beforeEach(function() {
    app.info_center.getjsonInfo = function(args) {
      return {
        JsonInfo
      };
    };
  });


  it('should get coords', function() {
    expect(getCoordsInPercentage(20,20)).toEqual({xcord:1000,ycord:1000});
  });

  //will insert additional tests here later
});