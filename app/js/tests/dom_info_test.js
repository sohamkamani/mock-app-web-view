describe('myFunction', function() {
  'use strict';
  var getById = app.domInfo.getById;
  var getFirstElementOfClass = app.domInfo.getFirstElementOfClass;
  var img = document.createElement('img');
  img.setAttribute('id', '1234');

  beforeEach(function() {
    document.getElementById = function(id) {
      switch (id) {
        case '1234':
          return img;
          break;
      }
    };
  });

  it('should get id', function() {

    expect(getById('1234')).toEqual(img);
  });




  //will insert additional tests here later
});
