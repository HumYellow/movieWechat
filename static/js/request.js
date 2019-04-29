const apiHttp = "https://*****.com";
const socketHttp = "wss://*****.com/wss";
function ajax(url, method, data, header) {
  data = data || {};
  header = header || {};
  let sessionId = wx.getStorageSync("UserSessionId");
  if (sessionId) {
    if (!header || !header["SESSIONID"]) {
      header["SESSIONID"] = sessionId;
    }
  }
  wx.showNavigationBarLoading();
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: apiHttp + url,
      header: header,
      data: data,
      method: method,
      success: function (res) {
        if (typeof res.data === "object") {
          if (res.data.status) {
            if (res.data.status === -200) {
              wx.showToast({
                title: "为确保能向您提供最准确的服务，请退出应用重新授权",
                icon: "none"
              });
              reject("请重新登录");
            } else if (res.data.status === -201) {
              wx.showToast({
                title: res.data.msg,
                icon: "none"
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: "/pages/user/supplement/supplement"
                });
              }, 1000);
              reject(res.data.msg);
            }
          }
        }
        resolve(res);
      },
      fail: reject,
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  });
  return promise;
}
function upload(url, name, filePath) {
  let header = {};
  let sessionId = wx.getStorageSync("UserSessionId"); //从缓存中拿该信息
  if (sessionId) {
    if (!header || !header["SESSIONID"]) {
      header["SESSIONID"] = sessionId; //添加到请求头中
    }
  }
  wx.showNavigationBarLoading();
  let promise = new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: apiHttp + url,
      filePath: filePath,
      name: name,
      header: header,
      success: function (res) {
        resolve(res);
      },
      fail: reject,
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  });
  return promise;
}
module.exports = {
  apiHttp: apiHttp,
  socketHttp: socketHttp,
  "get": function (url, data, header) {
    return ajax(url, "GET", data, header);
  },
  "post": function (url, data, header) {
    return ajax(url, "POST", data, header);
  },
  upload: function (url, name, filePath) {
    return upload(url, name, filePath);
  }
};
//调用方法
// const Request = require("/static/js/request");//导入模块
// Request.post("/api/xcxWxLogin", {  //调用方法
//   code: res.code,
//   encryptedData: resp.encryptedData,
//   iv: resp.iv,
//   shareId: share.shareId || "",
//   salesmanId: share.salesmanId || "",
//   source: share.source || ""
// }).then(res => { //成功回调
//           //todo
// }).catch(err => { }); //异常回调
