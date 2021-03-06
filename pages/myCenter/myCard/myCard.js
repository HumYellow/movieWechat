// pages/myCenter/myCard/myCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })

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
    this.getCardList()
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
  toBindCard: function (e) {
    let url = '/pages/cinema/cinemaList/cinemaList'
    app.toTabBar(url)
    // wx.navigateTo({
    //   url: url
    // })
  },
  toCardDetail: function (e) {
    let cardId = e.currentTarget.dataset.id
    let url = '/pages/myCenter/cardDetail/cardDetail?cardId=' + cardId
    wx.navigateTo({
      url: url
    })

  },
  getCardList: function () {
    let url = "/home/vip/listData"
    let data = {}
    app.request('get', url, data, (res) => {
      console.info(res.data)
      this.setData({
        cardList: res.data
      })
    })

  },
})