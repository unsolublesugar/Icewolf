$(function() {

    var storage = window.localStorage;

    if (!storage.isLogin) {
        location.href = "login.html";
    }

//TODO:ボタンアクション取得して分岐
	//TODO:新規投稿
	//TODO:リプライ表示
	//TODO:お気に入り表示
	//TODO:検索

	//TODO:デフォルトはタイムライン表示
	$("#textContents").charCount();

});