// const newscript1 = document.createElement('script');
// newscript1.setAttribute('type', 'text/javascript');
// newscript1.setAttribute('src', './jquery.js');
const head = document.getElementsByTagName('head')[0];
// head.appendChild(newscript1);
const newscript2 = document.createElement('script');
newscript2.setAttribute('type', 'text/javascript');
newscript2.setAttribute('src', 'http://pv.sohu.com/cityjson?ie=utf-8');
// let head = document.getElementsByTagName('head')[0];
// head.appendChild(newscript1);
head.appendChild(newscript2);

function formatDatetime() {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1 < 10 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1;
  const date = nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate();
  const hour = nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours();
  const minute = nowDate.getMinutes() < 10 ? `0${nowDate.getMinutes()}` : nowDate.getMinutes();
  const second = nowDate.getSeconds() < 10 ? `0${nowDate.getSeconds()}` : nowDate.getSeconds();
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}
window.onload = function () {
  const from = document.referrer;
  const addtime = formatDatetime();
  const browser = {
    versions: (function () {
      let u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        // 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') == -1,
        weixin: u.indexOf('MicroMessenger') > -1,
        qq: u.match(/\sQQ/i) == ' qq',
      }; // IE内核 //opera内核 //苹果、谷歌内核 //火狐内核 //是否为移动终端 //ios终端 //android终端或者uc浏览器 //是否为iPhone或者QQHD浏览器 //是否iPad
      // 是否web应该程序，没有头部与底部 //是否微信 //是否QQ
    }()),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };
  let device;
  if (
    browser.versions.mobile ||
    browser.versions.ios ||
    browser.versions.android ||
    browser.versions.iPhone ||
    browser.versions.iPad
  ) {
    device = 'mobile';
  } else {
    device = 'pc';
  }
  const reqUrl = `http://ip-api.com/json/${returnCitySN.cip}?lang=zh-CN}`;
  $.get(reqUrl, (data) => {
    const send = {
      ip: returnCitySN.cip,
      ipaddress: `${data.country},${data.city}`,
      addtime,
      from: from || '',
      device,
      devicedetail: navigator.userAgent,
    };
    let baseURL = 'http://api.yc.cab/';
    $.ajax({
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      type: 'post',
      url: `${baseURL}users/RootSiteRecord`,
      data: send,
      success(data) {
        console.log(data);
      },
    });
  });
  // console.log(returnCitySN["cip"] + ',' + returnCitySN["cname"]);
  // console.log(from)
  // console.log(addtime)
  // console.log(navigator.userAgent)
  // console.log(device);
};
