// pages/login/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    msgCode: '',
    getMsgCode_allow: false,
    verifyGeting: false,
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
  getPhone: function (e) {
    let phone = e.detail.value;
    this.setData({
      phone: phone
    })
    if (phone.length == 11) {
      if (this.data.getMsgCode_allow) return
      this.setData({
        getMsgCode_allow: true
      })
    } else {
      this.setData({
        getMsgCode_allow: false
      })
    }
  },
  getMsgCode: function (e) {
    if (!this.data.getMsgCode_allow) return
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
      let url = '/home/member/sendDynamicCode'
      let data = {
        phone: this.data.phone
      };
      app.request('post', url , data, (res) => {
        wx.showToast({
          title: '短信已发送',
          icon: 'succes',
          duration: 3000,
          mask: true
        })
        this.setData({
          getMsgCode_allow: false,
          verifyGeting: true
        })
        this.countdown(59000)
      }, (err) => {
        console.log(err)
      })

    }
  },
  inputMsgCode:function(e){
    let msgCode = e.detail.value;
    this.setData({
      msgCode: msgCode,
    })
  },
  subCode: function () {
    let url = '/home/member/bindPhoneByDynamicCode'
    let data = {
      phone: this.data.phone,
      dynamicCode: this.data.msgCode
    }
    app.request('post', url, data, (res) => {
      console.info(res)
      wx.showModal({
        title: '提示',
        content: '绑定成功！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    }, (err) => {
      console.log(err)
    })
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
})