var getCachedJSON = function (url, callback) {
  var cachedData = window.localStorage[url];
  if (cachedData) {
    callback(JSON.parse(cachedData));
  } else {
    $.getJSON(url, function (data) {
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
        if (language == 'Markdown') {
          raw_url = item.files[filename].raw_url;
          title = item.description;
          tr = $('<p><a href="post.html?url=' + raw_url + '&title=' + title + '&filename=' + filename + '")">' + title + '</a></p>');
          $("#posts").append(tr);
        }
      });
    });
  }
  getGists();
