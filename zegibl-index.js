function getGists() {
  var url = 'https://api.github.com/users/davidthewatson/gists';
  $.getJSON(url, function (data) {
      $.each(data, function (i, item) {
        filename = Object.keys(item.files)[0];
        language = item.files[filename].language;
        id = item.id;
        if (language == 'Markdown') {
          raw_url = item.files[filename].raw_url;
          title = item.description;
          //tr = $('<p><a href="post.html?url=' + raw_url + '&title=' + title + '&filename=' + filename + '")">' + title + '</a></p>');
          window.localStorage[id] = JSON.stringify({ 'url': raw_url,
                                      'title': title});
          tr = $('<p><a href="/#' + id + '">' + title + '</a></p>');
          $("#posts").append(tr);
        }
      });
    });
  }
