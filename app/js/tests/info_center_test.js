describe('myFunction', function() {
  'use strict';
  var getCoordsInPercentage = app.infoCenter.getCoordsInPercentage;
  var getJsonInfo = app.infoCenter.getJsonInfo;
  var getCommentInfo = app.infoCenter.getCommentInfo;
  var getDateTime = app.infoCenter.getDateTime;
  var dummyJson = '{"default":"img1","images":{"img1":{"filename":"img1","id":"img1","filepickerurl":"../dummy_data/img1.png","dimensions":{"height":1514,"width":1514},"hotspots":{"hp1":{"id":"hp1","t":10,"l":20,"w":40,"h":50,"link":"img2"},"hp2":{"id":"hp2","t":80,"l":20,"w":40,"h":5,"link":"img2"}}},"img2":{"filename":"img2","id":"img2","filepickerurl":"../dummy_data/img2.png","dimensions":{"height":230,"width":230},"hotspots":{"hp1":{"id":"hp1","t":10,"l":20,"w":40,"h":50,"link":"img1"},"hp2":{"id":"hp2","t":70,"l":60,"w":40,"h":5,"link":"img1"}}}}}';
  var dummyComment = '[ { _id: { $oid: "54eacedfe4b01ec4150fa141"},image_id: "img1",author_name: "Mayanka",comment_value: "Super bad!!",position_x: 56.35673624288425,position_y: 16.304347826086957,time_stamp: "Mon Feb 23 2015 12:26:35 PM"}]';
  beforeEach(function() {
    app.domInfo.getById = function(args) {
      return {
        offsetTop: 10,
        offsetLeft: 10,
        offsetHeight: 1,
        offsetWidth: 1
      };
    };
  });


  it('should get coords', function() {
    expect(getCoordsInPercentage(20, 20)).toEqual({
      xcord: 1000,
      ycord: 1000
    });
  });


  it('should get date', function() {
    var currentDate = new Date();
    expect(getDateTime()).toEqual(currentDate.toDateString() + ' ' + currentDate.toLocaleTimeString());
  });

  it('should get JsonInfo', function() {
    app.infoCenter.setJsonInfo(dummyJson);
    expect(getJsonInfo()).toEqual(dummyJson);
  });

  it('should get CommentInfo', function() {
    app.infoCenter.setCommentInfo(dummyComment);
    expect(getCommentInfo()).toEqual(dummyComment);
  });



  //will insert additional tests here later
});
