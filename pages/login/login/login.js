// pages/login/login/login.js
const app = getApp()
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
  toLogin:function(){
    app.wxLogin()
  },
  toBindPhone: function () {
    //跳转到绑定页
    wx.navigateTo({
      url: "/pages/login/bindPhone/bindPhone"
    });

  },
  text:function(){
    let data = {}
    app.request('get', '/login/info', data, (res) => {
      let userName = res.data.userName
      console.info(res.data)
    }, (err) => {
      console.log(err)
    })
  }
})