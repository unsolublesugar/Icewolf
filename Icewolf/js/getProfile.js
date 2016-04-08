window.addEventListener(
   "load",
   function() {
      showActionMenu;document.getElementById('profile_trigger').onclick = getProfile;
      var iconics = document.querySelectorAll("menuitem[icon]");
      for (var i=0, max=iconics.length; i < max; ++i) {
         var iconic = iconics[i];
         iconic.style.backgroundImage = (
            "url(\"" + iconic.getAttribute("icon") + "\")"
         );
      }
   }
);

function getProfile() {
  var oauth = getOAuth();

  oauth.get("https://api.twitter.com/1.1/users/show.json?include_entities=true&screen_name=" + storage.screenName, function(data) {
    entries = JSON.parse(data.text);
    var html = [];

    html = pushProfileHtml(entries);
    $('#header_text').text('Profile');
    $('#profile').html(html.join(''));
  },

   function(data) { alert('lame'); console.dir(data);
 }, failureHandler);
}

function pushProfileHtml(entries) {
  var html = [];

  var user_name = entries['name'];
  var screen_name = entries['screen_name'];
  var icon = entries['profile_image_url'];
  icon = icon.replace('_normal', '');
  var description = isNull(entries['description']);
  var location = isNull(entries['location']);
  var url = isNull(entries['url']);

  var tweet_count = entries['statuses_count'];
  var friends_count = entries['friends_count'];
  var followers_count = entries['followers_count'];

  var favourites_count = entries['favourites_count'];
  var listed_count = entries['listed_count'];
  var created_at = getStartedTwitter(entries['created_at']);

  html.push(
   '<div class="profile">' +
   '<div class="twitter_icon"><a href="https://twitter.com/' + screen_name + '"><img src="' + icon + '" alt="' + screen_name + '" width="64" height="64" /></a></div>' +
     '<div class="user_name"><a href="https://twitter.com/' + screen_name + '">' + user_name + '</a></div>' +

     '<div class="screen_name"><a href="https://twitter.com/' + screen_name + '">@' + screen_name + '</a></div>' +

     location + '<br>' +
     url + '<br>' +

     '<div class="description">' + description + '</div>' +
     '</div>' +

    '<div class="profile_count"><ul>' +
     '<li>Tweets：' + tweet_count + '</li>' +
     '<li>Following：'+ friends_count + '</li>' +
     '<li>Followers：' + followers_count + '</li>' +
     '<li>favourites：' + favourites_count + '</li>' +
     '<li>lists：' + listed_count + '</li>' +
     '</ul></div>'
  );
  return html;
}

function isNull(value) {
  if(value === null){
    return '';
  } else {
    return value;
  }

}