var storage = window.localStorage;

function getOAuth() {
  var config = {
      consumerKey: oauthInfo.consumerKey,
      consumerSecret: oauthInfo.consumerSecret,
      accessTokenKey: storage.accessTokenKey,
      accessTokenSecret: storage.accessTokenSecret
  };
  var oauth = new OAuth(config);
  if (!storage.screenName) {
	getScreenName(oauth);
  }
  return oauth;
}

function getScreenName(oauth) {
  oauth.get("https://api.twitter.com/1.1/account/verify_credentials.json", function(data) {
    entries = JSON.parse(data.text);
    storage.screenName = entries['screen_name'];
  },

   function(data) { alert('lame'); console.dir(data);
 }, failureHandler);
}