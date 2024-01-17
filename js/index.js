window.alert = function (name) {
  var iframe = document.createElement("IFRAME");
  iframe.style.display = "none";
  iframe.setAttribute("src", 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  window.frames[0].window.alert(name);
  iframe.parentNode.removeChild(iframe);
}
window.confirm = function (message) {
  var iframe = document.createElement("IFRAME");
  iframe.style.display = "none";
  iframe.setAttribute("src", 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  var result = window.frames[0].window.confirm(message);
  iframe.parentNode.removeChild(iframe);
  return result;
}

var ua = window.navigator.userAgent.toLowerCase();
var inApp = ua.indexOf('iting') > -1; //是否在APP内
var inWeixin = ua.indexOf('micromessenger') > -1; //是否在微信内

// 获取 cookie
var cookieset = {
  set: function (name, value, option) {
    var n, i = option && option.domain,
      o = option && option.path || "/";
    /ximalaya\.com$/.test(window.location.hostname) && (i = ".ximalaya.com"),
      option && option.expires && (n = new Date).setTime(n.getTime() + option.expires);
    var a = name + "=" + value + (i ? "; domain=" + i : "") + (o ? "; path=" + o : "") + (n ? "; expires=" + n.toUTCString() : "") + (option && option.secure ? "; secure" : "");
    return document.cookie = a,
      a
  },
  get: function (t) {
    var e = new RegExp("(^| )" + t + "=([^;]*)(;|$)").exec(document.cookie);
    return e ? e[2] : ""
  },
  remove: function (t) {
    this.set(t, "", {
      expires: -1e3
    })
  }
};

// ajax
function post(opt) {
  var xhr = new XMLHttpRequest();
  xhr.open('post', opt.url, true);
  xhr.setRequestHeader("Content-Type", opt.type || "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      opt.callback(JSON.parse(xhr.responseText));
    }
  };
  if (opt.type && opt.type !== "application/json") {
    var t = '';
    for (var i in opt.data) {
      t += i + '=' + opt.data[i] + '&';
    }
    xhr.send(t);
  } else {
    xhr.send(JSON.stringify(opt.data));
  }
}
