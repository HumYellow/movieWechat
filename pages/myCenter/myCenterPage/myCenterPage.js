// pages/myCenter/myCenterPage/myCenterPage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userName:'',
    userHeadPic:'',

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
    this.getUserInfo()
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
  toTabBar: function (e) {
    let url = e.currentTarget.dataset.url
    app.toTabBar(url)
  },
  getUserInfo:function(){
    let data = '';
    app.request('get', '/login/info', data, (res) => {
      let userName = res.data.userName
      this.setData({
        'userName': res.data.nickName,
        'userHeadPic': res.data.headImg
      })
    }, (err) => {
      console.log(err)
    })
  },
  toLogin: function () {
    //跳转到登录页
    wx.navigateTo({
      url: "/pages/login/login/login"
    });
  },
  toBindPhone: function () {
    //跳转到登录页
    wx.navigateTo({
      url: "/pages/login/bindPhone/bindPhone"
    });

  },
})