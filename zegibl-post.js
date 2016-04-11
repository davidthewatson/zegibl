var getCached = function (id, callback) {
  var url = JSON.parse(window.localStorage[id])['url'];
    $.get(url, function (data) {
      callback(data);
     });
  // }
};

function getGist(id) {
  getCached(id,
    function(response){
      $("#title").html(JSON.parse(window.localStorage[id])['title']);
      md = marked(response);
      $("#posts").html(md);
    });
  }
