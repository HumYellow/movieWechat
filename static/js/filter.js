const app = getApp()
function loginCheck(pageObj) {
  if (pageObj.onLoad) {
    let _onLoad = pageObj.onLoad;
    // 使用onLoad的话需要传递options
    pageObj.onLoad = function (options) {
      app.checkSession()
      if (wx.getStorageSync('USERID')) {
        // 获取当前页面
        let currentInstance = getPageInstance();
        _onLoad.call(currentInstance, options);

      } else {
        //跳转到登录页
        wx.redirectTo({
          url: "/pages/login/login/login"
        });
      }
      // wx.getSetting({
      //   success(res) {
      //     if (res.authSetting) {
      //       console.info
      //       // 获取当前页面
      //       let currentInstance = getPageInstance();
      //       _onLoad.call(currentInstance, options);

      //     } else {
      //       //跳转到登录页
      //       wx.redirectTo({
      //         url: "/pages/login/login/login"
      //       });
      //     }
      //   }
      // })
    }
  }
  return pageObj;
}

// 获取当前页面    
function getPageInstance() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

exports.loginCheck = loginCheck;