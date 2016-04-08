function getTimeStamp(created_at) {
  var date = new Date(created_at);
  var post_date = date.toString();
  var year = date.getFullYear();
  var mon  = date.getMonth() + 1;
  var day  = date.getDate();
  var now_date = new Date();
  var sec_now_date = strtotime(now_date.toString());
  var sec_post_date = strtotime(post_date);
  var timestamp = '';

  relative_time = sec_now_date - sec_post_date;

  if (relative_time < 60) {
    timestamp = relative_time + 's';
  } else if (relative_time >= 60 && relative_time < (60 * 60)) {
    timestamp = Math.round(relative_time / 60) + 'm';
  } else if (relative_time >= (60 * 60) && relative_time < (60 * 60 * 24)) {
    timestamp = Math.round(relative_time / (60 * 60)) + 'h';
  } else if (relative_time >= (60 * 60 * 24) && relative_time < (60 * 60 * 24 * 365)) {
    timestamp = toDoubleDigits(mon) + '/' + toDoubleDigits(day);
  } else {
    timestamp = year + '/' + toDoubleDigits(mon) + '/' + toDoubleDigits(day);
  }
  return timestamp;
}

function getStartedTwitter(created_at) {
  var date = new Date(created_at);
  var year = date.getFullYear();
  var mon  = date.getMonth() + 1;
  var day  = date.getDate();

  timestamp = year + '/' + toDoubleDigits(mon) + '/' + toDoubleDigits(day);
  return timestamp;
}

var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;
};