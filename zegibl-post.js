var getCached = function (url, callback) {
  var cachedData = window.localStorage[url];
  if (cachedData) {
    callback(cachedData);
  } else {
    $.get(url, function (data) {
      window.localStorage[url] = data;
      callback(data);
    });
  }
};

function getGist(url, title, filename) {
  getCached(url,
    function(response){
      $("#title").html(title);
      md = marked(response);
      $("#posts").html(md);
    });
  }


  var url = Arg("url");
  var title = Arg("title");
  var filename = Arg("filename");
  window.onload = getGist(url, title, filename);
