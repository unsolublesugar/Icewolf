window.addEventListener(
   "load",
   function() {
      showActionMenu;document.getElementById('dm_trigger').onclick = getDM;
      var iconics = document.querySelectorAll("menuitem[icon]");
      for (var i=0, max=iconics.length; i < max; ++i) {
         var iconic = iconics[i];
         iconic.style.backgroundImage = (
            "url(\"" + iconic.getAttribute("icon") + "\")"
         );
      }
   }
);

function getDM() {
  var oauth = getOAuth();

   oauth.get("https://api.twitter.com/1.1/direct_messages.json", function(data) {
     entries = JSON.parse(data.text);
     var html = [];

     for (var i = 0; i < entries.length; i++) {
       var tweet = entries[i].text;
       var user_name = entries[i].sender.name;
       var screen_name = entries[i].sender.screen_name;
       var icon = entries[i].sender.profile_image_url;
       var created_at = entries[i].created_at;
       timestamp = getTimeStamp(created_at);


//TODO:リツイート者名、リツイートアイコン、Retweeted by xxx

//TODO:「詳細」リンクで表示
  //TODO:リプライボタン
  //TODO:リツイートボタン
  //TODO:お気に入りボタン

      tweet = twttr.txt.autoLink(tweet);

       html.push(
         '<div class="tweet">' +
         '<div class="twitter_icon"><a href="https://twitter.com/' + screen_name + '">' + '<img src="' + icon + '" alt="' + screen_name + '" width="48" height="48" /></a></div>' +
           '<span class="user_name">' + user_name + '</span> ' +
           '<span class="screen_name">@' + screen_name + '</span>' +
           '<span class="timestamp">' + timestamp + '</span><br>' +
           '<div class="tweet_block">' + tweet + '</div>' +
           '</div>'
         );
     };
     $('#header_text').text("Messages");
     $('#dm').html(html.join(''));
   },

   function(data) { alert('lame'); console.dir(data);
 }, failureHandler);
}

function failureHandler(data) {
   console.error(data);
}
