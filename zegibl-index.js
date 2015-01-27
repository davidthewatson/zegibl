String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
var getCachedJSON = function (url, callback) {
  var cachedData = window.localStorage[url];
  if (cachedData) {
    console.log('Data already cached, returning from cache:', url);
    callback(JSON.parse(cachedData));
  } else {
    $.getJSON(url, function (data) {
      console.log('Fetched data, saving to cache:', url);
      window.localStorage[url] = JSON.stringify(data);
      callback(data);
    });
  }
};
function getGists() {
  var url = 'https://api.github.com/users/davidthewatson/gists';
  var user = Arg("user");
  if (user) {
    url = 'https://api.github.com/users/' + user + '/gists';
  }
  getCachedJSON(url,
    function (data) {
      $.each(data, function (i, item) {
        filename = Object.keys(item.files)[0];
        language = item.files[filename].language;
        if (language == 'HTML' || language == 'Markdown') {
          raw_url = item.files[filename].raw_url;
          title = filename.slice(0,filename.indexOf('.')).replace(/_/g, ' ').toProperCase();
          tr = $('<p><a href="post.html?url=' + raw_url + '&title=' + title + '&filename=' + filename + '")">' + title + '</a></p>');
          $("#posts").append(tr);
        }
      });
    });
  }
  getGists();
