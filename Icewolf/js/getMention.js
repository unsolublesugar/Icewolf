window.addEventListener(
   "load",
   function() {
      showActionMenu;document.getElementById('mention_trigger').onclick = getMention;
      var iconics = document.querySelectorAll("menuitem[icon]");
      for (var i=0, max=iconics.length; i < max; ++i) {
         var iconic = iconics[i];
         iconic.style.backgroundImage = (
            "url(\"" + iconic.getAttribute("icon") + "\")"
         );
      }
   }
);

function getMention() {
  var oauth = getOAuth();

  oauth.get("https://api.twitter.com/1.1/statuses/mentions_timeline.json", function(data) {
    entries = JSON.parse(data.text);
    var html = [];

    html = pushTweetHtml(entries);
    $('#header_text').text("Mentions");
    $('#mention').html(html.join(''));
  },

   function(data) { alert('lame'); console.dir(data);
 }, failureHandler);
}

function failureHandler(data) {
   console.error(data);
}
