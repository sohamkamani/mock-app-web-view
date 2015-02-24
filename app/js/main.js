'use strict';


function init() {
  // var dummyJson = '{"default":"img1","images":{"img1":{"filename":"img1","id":"img1","filepickerurl":"../dummy_data/img1.png","dimensions":{"height":1514,"width":1514},"hotspots":{"hp1":{"id":"hp1","t":10,"l":20,"w":40,"h":50,"link":"img2"},"hp2":{"id":"hp2","t":80,"l":20,"w":40,"h":5,"link":"img2"}}},"img2":{"filename":"img2","id":"img2","filepickerurl":"../dummy_data/img2.png","dimensions":{"height":230,"width":230},"hotspots":{"hp1":{"id":"hp1","t":10,"l":20,"w":40,"h":50,"link":"img1"},"hp2":{"id":"hp2","t":70,"l":60,"w":40,"h":5,"link":"img1"}}}}}';
  //var dummyJson = '{"images":{"iphone":{"filename":"iphone","id":"iphone","filepickerurl":"https://www.filepicker.io/api/file/II5YbloBQLumR77Hq31s","dimensions":{"height":305,"width":440},"hotspots":{"hotspot0":{"id":"hotspot0","t":16.065573770491802,"l":30.681818181818183,"w":39.09090909090909,"h":28.19672131147541,"link":"url"}}},"url":{"filename":"url","id":"url","filepickerurl":"https://www.filepicker.io/api/file/iPk0TCLgQdWQZaTuM4aC","dimensions":{"height":189,"width":267},"hotspots":{}}},"default":"iphone"}';
  // var project = JSON.parse(dummyJson);

  //  app.infoCenter.setJsonInfo(project);

  // app.renderPage.render();
  app.mongodb.fetchJsonInfo();

  app.mongodb.fetch();

  app.domInfo.getById('compress-button').classList.add('display-none');

}


function reRender() {
  app.renderPage.render();
  app.commentPage.assignEventToImage();
  app.mongodb.fetch();
}


window.onload = init;

window.onhashchange = reRender;
