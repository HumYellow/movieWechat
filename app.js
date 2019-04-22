//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null
  },
  movieWx:{
    checkSession: function () {
      let that = this
      //---------登录有效期检查
      wx.checkSession({
        success: function () {
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail: function () {
          // session_key 已经失效，需要重新执行登录流程
          that.wxLogin() //重新登录
        }
      });
    },
    wxLogin: function () {
      wx.login({
        success: res => {
          console.log('code转换', res.code); //用code传给服务器调换session_key
          wx.request({
            url: 'https://你的接口文件路径', //接口地址
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {

            }
          })
        }
      });
    },
  }

})