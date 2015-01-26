<!doctype html>
<html lang="en">
<head>
  <title>ZeGiBl</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" type="text/css" href="simplegrid.css" />
  <style>
  .content {
    padding: 10px;
    font-family: Sans-Serif;
  }
  dl>dt {
    font-weight: bold;
  }
  dl>dd {
    font-style: italic;
  }
  </style>
</head>
<body>
  <div class="grid grid-pad">
    <div class="col-1-1">
      <div class="content">
        <h2>Why ZeGiBl?</h2>
        <p>
          ZeGiBl (sounds like <em>legible</em>) is a portmanteau of ZeptoJS,
          Gist, and Blog that was inspired by my work on
          <a href="http://davidwatson.org/flasgist/">flasgist</a>
          several years ago. Flasgist worked great, but it suffered
          from performance problems because of the server-to-server
          latency and rate limits in Github's API. ZeGiBl solves these problems by
          deferring all Github API communication to client-side JavaScript which enables
          you to deploy a blog without having to deploy any backend web server.
          ZeGiBl relies on Github Gists for CRUD actions on blog posts and relies
          on client-side JavaScript to render a list of blog posts and individual
          blog posts. ZeGiBl uses Github Gists for data storage, zeptojs as a
          lightweight jquery surrogate, markedjs for parsing markdown, and argjs
          for parsing URL query arguments.
        </p>
        <h2>How does ZeGiBl work?</h2>
        <p>The <a href="#posts">list of posts below</a> is generated when the JS in this page reads
          <a href="https://api.github.com/users/davidthewatson/gists">
            JSON returned from an HTTP GET request against the Gist API on Github</a>
          for the user account davidthewatson. A click on any link in
          the list below simply requests another static HTML page
          passing the JSON parameters for that Gist as query parameters. The post page
          simply reads those parameters, loads the markdown for that post, parses it,
          and renders the page.
        </p>
        <h2 id="title">What does ZeGiBl look like?</h2>
        <div id="posts">
        </div>
        <h2>Where can I deploy ZeGiBl?</h2>
      <p>You can deploy ZeGiBl anywhere you can deploy a static HTML web page.
      This includes Github Pages, Google Pages, Heroku, your own web server, or a
      file on your computer.</p>
      <h2>How do I get started with ZeGiBl</h2>
      <h3>Using a file on your computer</h3>
      <ol>
        <li>Login to Github or <a href="https://github.com/">signup for Github</a> if you don't have an account
        <li>Goto <a href="https://gist.github.com/">Github Gists</a> and make sure that you have at least one public gist with a .md or .html extension</li>
        <li>Download and unzip <a href="https://github.com/davidthewatson/zegibl/archive/master.zip">the ZeGiBl code</a></li>
        <li>Edit the index.html file and replace <em>davidthewatson</em> with your Github username and save the file</li>
        <li>Load the file in your browser. On Mac OS X, this is as simple as <em>open index.html</em></li>
      </ol>
      <p>Your public gists with an .md or .html extension should appear under
        <a href="#posts">What Does ZeGiBl look like?</a>. If not, look for any errors in the browser's JavaScript console.</p>
        <p>You can now style to suit, or just deploy all of the files in the directory as is to any static web server.</p>
      <h3>Using Github Pages</h3>
<p>Coming Soon!</p>
    </div>
    </div>
  </div>
  <script src="zepto.min.js"></script>
  <script src="arg-1.2.min.js"></script>
  <script src="marked.min.js"></script>
  <script>
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
    getCachedJSON('https://api.github.com/users/davidthewatson/gists',
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
  </script>
</body>
</html>
