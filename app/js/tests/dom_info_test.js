describe('myFunction', function() {
  'use strict';
  var getById = app.domInfo.getById;
  var getFirstElementOfClass = app.domInfo.getFirstElementOfClass;
  var img = document.createElement('img');
  img.setAttribute('id', '1234');
  var div = document.createElement('div');
  div.setAttribute('class', 'mayanka');


  beforeEach(function() {
    document.getElementById = function(id) {
      switch (id) {
        case '1234':
          return img;
      }
    };
    document.getElementsByClassName = function(className) {
      switch (className) {
        case 'mayanka':
          return [div];
      }
    };
  });

  it('should get id', function() {

    expect(getById('1234')).toEqual(img);
  });
  it('should get class name', function() {

    expect(getFirstElementOfClass('mayanka')).toEqual(div);
  });
  //will insert additional tests here later
});
