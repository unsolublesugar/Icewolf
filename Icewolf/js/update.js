window.addEventListener(
   "load",
   function() {
      showActionMenu;document.getElementById('update_trigger').onclick = update;
      var iconics = document.querySelectorAll("menuitem[icon]");
      for (var i=0, max=iconics.length; i < max; ++i) {
         var iconic = iconics[i];
         iconic.style.backgroundImage = (
            "url(\"" + iconic.getAttribute("icon") + "\")"
         );
      }
   }
);

function update() {
  var oauth = getOAuth();

   tweet = $("#textContents").val();
   var option = { "status" : tweet };

   oauth.post("https://api.twitter.com/1.1/statuses/update.json", option,
      function (data) {
         $("#textContents").val("");
      });

   hideActionMenu();

   getHomeTimeline();
   setTimeout("junpIndex()",800);
}

function junpIndex(){
   location.href="index.html";
}


function showActionMenu() {
   document.querySelector(".menuaction").style.display="block";
}

function hideActionMenu() {
   //TODO:現時点ではテキスト内容消すけど、下書き保存できるようにしたい
   $("#textContents").val("");

   document.querySelector(".menuaction").style.display="none";
}
