window.onload = init;

window.onhashchange = init;

function init () {


  var dummyJson ='{"default":"img1","images":{"img1":{"filename":"img1","id":"img1","filepickerurl":"../dummy_data/img1.png","dimensions":{"height":230,"width":230},"hotspots":{"hp1":{"id":"hp1","t":10,"l":20,"w":40,"h":50,"link":"img2"},"hp2":{"id":"hp2","t":90,"l":20,"w":40,"h":5,"link":"img2"}}},"img2":{"filename":"img2","id":"img2","filepickerurl":"../dummy_data/img2.png","dimensions":{"height":230,"width":230},"hotspots":{"hp1":{"id":"hp1","t":10,"l":20,"w":40,"h":50,"link":"img1"},"hp2":{"id":"hp2","t":90,"l":60,"w":40,"h":5,"link":"img1"}}}}}';
  var project = JSON.parse(dummyJson);

  // location.href = "index.html#" + project.default;
  app.infoCenter.setJsonInfo(project);
  app.renderPage.render(project);


}