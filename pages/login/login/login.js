// pages/login/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    msgCode:'',
    getMsgCode_allow:false,
    verifyGeting:false,
    countdownData: {
      day: 0,
      hr: 0,
      min: 0,
      sec: 0
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getPhone:function(e){
    let phone = e.detail.value;
    this.setData({
      phone: phone
    })
    if (phone.length == 11) {
      if (this.data.getMsgCode_allow) return
      this.setData({
        getMsgCode_allow:true
      })
    }else{
      this.setData({
        getMsgCode_allow: false
      })
    }
  },
  getMsgCode: function (e) {
    if (!this.data.getMsgCode_allow)return
    if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
        wx.showModal({
          title: '提示',
          content: '您的手机号码格式错误',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
    } else {
      wx.showToast({
        title: '短信已发送',
        icon: 'succes',
        duration: 3000,
        mask: true
      })
      this.setData({
        getMsgCode_allow: false,
        verifyGeting:true
      })
      this.countdown(59000)
    }
  },
  countdown: function (endDateStr) {
    const msec = parseInt(endDateStr / 1000)
    let day = parseInt(msec / 60 / 60 / 24)
    let hr = parseInt(msec / 60 / 60 % 24)
    let min = parseInt(msec / 60 % 60)
    let sec = parseInt(msec % 60)
    let countdownData = {
      day: day,
      hr: hr > 9 ? hr : '0' + hr,
      min: min > 9 ? min : '0' + min,
      sec: sec > 9 ? sec : '0' + sec
    }
    this.setData({
      countdownData: countdownData,
    })
    const that = this
    setTimeout(function () {
      if (endDateStr <= 0) {
        that.setData({
          verifyGeting: false,
        })
        return
      } else {
        that.countdown(endDateStr - 1000)
      }
    }, 1000)
  },
  wxLogin: function (e) {
    var ivObj = e.detail.iv
    var telObj = e.detail.encryptedData
    var codeObj = "";
    var that = this;
    //------执行Login
    console.info(ivObj)
    wx.login({
      success: res => {
        console.log('code转换', res.code); //用code传给服务器调换session_key

        wx.request({
          url: 'https://你的接口文件路径', //接口地址
          data: {
            appid: "APPID",
            secret: "appsecret",
            code: res.code,
            encryptedData: telObj,
            iv: ivObj
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            phoneObj = res.data.phoneNumber;
            console.log("手机号=", phoneObj)
            wx.setStorage({   //存储数据并准备发送给下一页使用
              key: "phoneObj",
              data: res.data.phoneNumber,
            })
          }
        })

        //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
        console.info(e)
        console.info(e.detail.errMsg)
        if (e.detail.errMsg != 'getPhoneNumber:ok') { //用户点击拒绝
            wx.showModal({
              title: '提示',
              content: '您已拒绝授权，请重新授权！',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
        } else { //授权通过执行跳转
          let pages = getCurrentPages();
          let beforePage = pages[pages.length - 2]
            wx.navigateBack({
              success: function () {
                beforePage.onLoad(); // 执行前一个页面的onLoad方法
              }
            });
        }
      }
    });
    //---------登录有效期检查
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    });
  },
})