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

var prizeInfo = {
  id10: {
    id: 1,
    prize: '汤臣倍健Yep磁感小粉瓶<sup>2</sup>（试饮装1瓶,30ml/瓶）',
    txt: '2. 为产品昵称，指汤臣倍健Yep绯常磁感胶原蛋白肽果味饮料（树莓味）',
  },
  id7: {
    id: 2,
    prize: '喜马拉雅月卡 1张',
  },
  id11: {
    id: 3,
    prize: '汤臣倍健Yep小白管<sup>3</sup>（试饮装1瓶,30ml/瓶）',
    txt: '3. 为产品昵称，指汤臣倍健胶原蛋白肽烟酰胺果味饮品（莓果味）',
  },
  id5: {
    id: 4,
    prize: '喜马拉雅年卡 1张',
  },
  id8: {
    id: 5,
    prize: '汤臣倍健小金罐蛋白粉<sup>1</sup>（420g）',
    txt: '1. 为产品昵称，指汤臣倍健复合蛋白粉固体饮料',
  },
  id6: {
    id: 6,
    prize: '喜马拉雅季卡 1张',
  },
  id4: {
    id: 7,
    prize: '谢谢参与',
  },
  id9: {
    id: 8,
    prize: '汤臣倍健小金罐蛋白粉<sup>1</sup>（2条装,10g/条）',
    txt: '1. 为产品昵称，指汤臣倍健复合蛋白粉固体饮料',
  },
};

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

// 当天还剩多少秒
function getTodaySurplusSeconds() {
  var now = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  var surplus = tomorrow.getTime() - now.getTime();
  return surplus;
}

function getQueryParams(qs) {
  qs = qs.split('+').join(' ');

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}


// 复制文本
function copyText(text) {
  if (!navigator.clipboard) {
    console.log('该浏览器不支持Clipboard API')
    return
  }
  navigator.clipboard.writeText(text).then(function () {
    alert('复制成功');
  }, function () {
    alert('复制失败');
  })
}

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


async function getAccessToken() {
  const SIGN_ACCESS_TOKEN = '_h5_access_token_' // 在 cookie 中存储的 access_token 键值（您可以随意定义）
  const SIGN_REFRESH_TOKEN = '_h5_refresh_token' // 在 cookie 中存储的 refresh_token 键值（您可以随意定义）

  const accessToken = cookieset.get(SIGN_ACCESS_TOKEN) // 读取 cookie 中存储的 access_token
  const refreshToken = cookieset.get(SIGN_REFRESH_TOKEN) // 读取 cookie 中的存储的 refresh_token

  // 逻辑1：cookie 中有 access_token，直接返回；
  if (!!accessToken) {
    return accessToken // 返回值为字符串
  }

}