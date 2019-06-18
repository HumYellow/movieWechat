// pages/order/orderDetail/orderDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    orderDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options)
    let orderId = options.orderId
    this.setData({
      orderId
    })
    this.getOrderDetail()
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
    let url = '/pages/order/orderList/orderList'
    app.toTabBar(url)

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
  getOrderDetail:function(){

    let url = '/home/ticketOrder/detailData'
    let data = {
      orderId: this.data.orderId
    }
    app.request('get', url, data, (res) => {
      this.setData({
        orderDetail: res.data
      })
      let a = this.data.orderDetail.busDetailStatus
      if (a == 'overtime' || a == 'inspect' || a == 'take' || a == 'return') {
          this.setData({
            op: true
          })
      }
      //测试用写死二维码可删
      let qrCodeParams = res.data.qrCodeParams ? res.data.qrCodeParams : '9089DCA28C9A2B5D686E10AFACE4CCDA'
      this.data.op ? app.getQRCode(qrCodeParams, '#d2e9d6') : app.getQRCode(qrCodeParams)
      
    })
  },
  toCinemaDetail: function () {
    let cinemaId = this.data.orderDetail.cinemaId
    let url = "/pages/movie/movieScene/movieScene?cinemaId=" + cinemaId
    wx.navigateTo({
      url,
    });

  }
})