//var storage = window.localStorage;

if (!storage.isLogin) {
    location.href = "login.html";
} else {
  getHomeTimeline();
}

window.addEventListener(
   "load",
   function() {
      showActionMenu;document.getElementById('timeline_trigger').onclick = getHomeTimeline;
      var iconics = document.querySelectorAll("menuitem[icon]");
      for (var i=0, max=iconics.length; i < max; ++i) {
         var iconic = iconics[i];
         iconic.style.backgroundImage = (
            "url(\"" + iconic.getAttribute("icon") + "\")"
         );
      }
   }
);

function getHomeTimeline() {
  var oauth = getOAuth();

  // TODO:countは設定で変更できるように
  oauth.get("https://api.twitter.com/1.1/statuses/home_timeline.json?count=50", function(data) {
    entries = JSON.parse(data.text);
    var html = [];

    html = pushTweetHtml(entries);
    $('#header_text').text("Timeline");
    $('#timeline').html(html.join(''));
  },

   function(data) { alert('lame'); console.dir(data);
 }, failureHandler);
}

function failureHandler(data) {
   console.error(data);
}

function pushTweetHtml(entries) {
  var html = [];

  for (var i = 0; i < entries.length; i++) {
    var tweet = entries[i].text;
    var user_name = entries[i].user.name;
    var screen_name = entries[i].user.screen_name;
    var icon = entries[i].user.profile_image_url;
    var created_at = entries[i].created_at;
    var timestamp = getTimeStamp(created_at);
    var id = entries[i].id_str;

  //TODO:リツイート者名、リツイートアイコン、Retweeted by xxx

  //TODO:「詳細」リンクで表示
  //TODO:リプライボタン
  //TODO:リツイートボタン
  //TODO:お気に入りボタン

  //TODO:ツイート内のリンクは外部ブラウザで開く？
  //     ・最終的には開くアプリを選べるようにしたい

    tweet = twttr.txt.autoLink(tweet);

     html.push(
       '<div class="tweet">' +
       '<div class="twitter_icon"><a href="https://twitter.com/' + screen_name + '">' + '<img src="' + icon + '" alt="' + screen_name + '" width="48" height="48" /></a></div>' +
         '<div class="tweet_block"><span class="user_name"><a href="https://twitter.com/' + screen_name + '">' + user_name + '</a></span> ' +
         '<span class="screen_name"><a href="https://twitter.com/' + screen_name + '">@' + screen_name + '</a></span>' +
         '<span class="timestamp"><a href="https://twitter.com/' + screen_name + '/status/' + id + '">' + '' + timestamp + '</a></span><br>' +
         tweet + '</div>' +
         '</div>'
     );
   }
  return html;
}
