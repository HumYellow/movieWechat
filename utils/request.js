const util = require('./util.js')
const md5 = require('./md5.js')
const request = {//请求封装
    apiHttp: 'http://129.211.85.17:8031/wxspapi/v1',
    appleKey: 'RWSF2JhLXNWkmygnsNb3yA4Ach8Pb6HNjkEH9GwZL49sC8bFg4n4k8j2jUuUFt9HSamb7fkUaVcQrBuvELv6a9Uyx2H4s58BtDz',
    wxRequest: function (method, url, data, callback, errFun) {
      let that = this
      let api = this.apiHttp + url
      //MD5加密
      let dataBox = {
        timestamp: that.getNewTime(),
        appType: 'applet',
        appKey: 'CT_APPKEY_APPLET',
        appVersion: '1.0.0',
        MemberEncode: wx.getStorageSync('MemberEncode')
      }
      let dataNew = Object.assign(dataBox, data)
      dataNew = this.treeMap(dataNew)
      let sign = ''
      for (var i in dataNew) {
        sign += '&'
        sign += i
        sign += '='
        sign += dataNew[i]
      }
      sign = sign.slice(1) + this.appleKey
      sign = md5.md5(sign).toUpperCase()
      dataNew.sign = sign
      //发起请求
      wx.request({
        url: api,
        method: method,
        data: dataNew,
        header: {
          'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'MemberEncode': wx.getStorageSync('MemberEncode')
        },
        dataType: 'json',
        success: function (res) {
          if (res.data.errcode == '0000') {
            callback(res.data);
          } else if (res.data.errcode == '5001') {
            wx.redirectTo({
              url: "/pages/login/login/login"
            });
          } else if (res.data.errcode == '5005') {
            wx.redirectTo({
              url: "/pages/login/bindPhone/bindPhone"
            });
          } else if (res.data.errcode == '9999') {
            let msg = res.data.msg
              wx.showModal({
                title: '提示',
                content: msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
          } else {
            let msg = res.data.msg
            wx.showModal({
              title: '提示',
              content: msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
            console.info(res)
          }

        },
        fail: function (err) {
          errFun(err);
        }
      })
    },
    getNewTime: function (date) {//获取当前时间戳
      var time = util.formatTime(date ? date : new Date());
      return time.replace(new RegExp('/', 'g'), "-")
    },
    treeMap: function (obj) {//按照首字母排序
      let arr = [];
      for (var a in obj) {
        arr.push(a)
      }
      arr = arr.sort()
      let objNew = {}
      for (var i = 0; i < arr.length; i++) {
        for (var z in obj) {
          if (arr[i] == z) objNew[z] = obj[z]
        }
      }
      return objNew
    }
}
module.exports = request