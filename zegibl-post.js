var getCached = function (url, callback) {
  var cachedData = window.localStorage[url];
  if (cachedData) {
    console.log('Data already cached, returning from cache:', url);
    callback(cachedData);
  } else {
    $.get(url, function (data) {
      console.log('Fetched data, saving to cache:', url);
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
  
