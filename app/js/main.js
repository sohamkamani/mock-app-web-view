'use strict';


function init() {
 // var dummyJson = '{"default":"img1","images":{"img1":{"filename":"img1","id":"img1","filepickerurl":"../dummy_data/img1.png","dimensions":{"height":1514,"width":1514},"hotspots":{"hp1":{"id":"hp1","t":10,"l":20,"w":40,"h":50,"link":"img2"},"hp2":{"id":"hp2","t":80,"l":20,"w":40,"h":5,"link":"img2"}}},"img2":{"filename":"img2","id":"img2","filepickerurl":"../dummy_data/img2.png","dimensions":{"height":230,"width":230},"hotspots":{"hp1":{"id":"hp1","t":10,"l":20,"w":40,"h":50,"link":"img1"},"hp2":{"id":"hp2","t":70,"l":60,"w":40,"h":5,"link":"img1"}}}}}';
  var dummyJson = '{"images":{"iphone.jpg":{"filename":"iphone.jpg","id":"iphone.jpg","filepickerurl":"https://www.filepicker.io/api/file/2o9SL5y7SvOxS1jVV1mT","dimensions":{"height":305,"width":440},"hotspots":{"hotspot0":{"id":"hotspot0","t":77.37704918032787,"l":18.863636363636363,"w":65,"h":15.081967213114755,"link":"iphone.jpg"},"hotspot1":{"id":"hotspot1","t":101.9672131147541,"l":59.54545454545455,"w":9.318181818181818,"h":25.57377049180328,"link":"iphone5c-selection-hero-2013.png"}}},"url.jpg":{"filename":"url.jpg","id":"url.jpg","filepickerurl":"https://www.filepicker.io/api/file/r6cVu8YSmQTfGnAeaAog","dimensions":{"height":189,"width":267},"hotspots":{"hotspot2":{"id":"hotspot2","t":11.11111111111111,"l":14.9812734082397,"w":68.16479400749064,"h":13.227513227513228,"link":"url.jpg"}}},"iphone5c-selection-hero-2013.png":{"filename":"iphone5c-selection-hero-2013.png","id":"iphone5c-selection-hero-2013.png","filepickerurl":"https://www.filepicker.io/api/file/7xFXnVTQ1Sk1YxjrXFKw","dimensions":{"height":300,"width":300},"hotspots":{}}},"default":"url.jpg"}';
  var project = JSON.parse(dummyJson);

  app.infoCenter.setJsonInfo(project);

  app.renderPage.render();

  app.commentPage.assignEventToImage();

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
