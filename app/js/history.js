var renderHistory = function() {

  var _historyStack = [];

  function push(imgName) {
    _historyStack.push(imgName);
  }

  function getLastVisited() {
    return _historyStack[_historyStack.length - 2];
  }

  function pop() {
    _historyStack.pop();
    return _historyStack.pop();
  }



  return {
    push: push,
    getLastVisited : getLastVisited,
    pop : pop
  };
}();
