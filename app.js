//app.js
const app = getApp()
const util = require('/utils/util.js')
const md5 = require('/utils/md5.js')
const request = require('/utils/request.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
  },
  request: function (method, url, data, callback, errFun) {//整合请求接口
    request.wxRequest(method, url, data, callback, errFun)
  },
  thisLoad:function(){//刷新当前页面
    const pages = getCurrentPages()
    const perpage = pages[pages.length - 1]
    perpage.onLoad() 
  },
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
  wxLogin: function (fn) {//微信登录获取用户凭证
    let that = this
    wx.login({
      success: (r) => {
        var code = r.code;//登录凭证
        if (code) {
            wx.getSetting({//获取用户当前权限设置
              success(res) {
                if (res.authSetting['scope.userInfo']){
                  wx.getUserInfo({//调用获取用户信息接口
                    success: (res) => {
                      var data = {
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        code: code
                      }
                      that.request('POST', '/login/decodeUserInfo', data, (res) => {
                        let code = res.data.MemberEncode
                        wx.setStorageSync('MemberEncode', code)
                        if (fn){
                          fn()
                        }else{
                          wx.navigateBack()
                        }
                      }, (err) => {
                        console.log(err)
                      })
                    },
                    fail: function (err) {
                      console.info('获取用户信息失败'+err)
                    }
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '请您授权，否则无法完成购票',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      }
                    }
                  })
                }
              }
            })
        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('微信登陆失败')
      }
    });
  },
  checkWxLogin:function(){//检查登陆
    let data = '';
    this.wxRequest('get', '/login/info', data, (res) => {
      if (!res.data.nickName) {
        //跳转到登录页
        wx.navigateTo({
          url: "/pages/login/login/login"
        });
      }
    }, (err) => {
      console.log(err)
    })
  },
  outWxLogin:function(){//退出登陆
    let data = '';
    this.wxRequest('get', '/login/info', data, (res) => {
      if (!res.data.nickName) {
        //跳转到登录页
        wx.navigateTo({
          url: "/pages/login/login/login"
        });
      }
    }, (err) => {
      console.log(err)
    })
  },
  md5:function(data){//MD5加密
    return md5.md5(data)
  },
  requestPay:function(){//支付接口
    wx.requestPayment({
      timeStamp: new Date(),
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) {
        
      },
      fail(res) {
        
      }
    })
  },
  toTabBar: function (url) {
    wx.switchTab({
      url: url
    })
  }

})