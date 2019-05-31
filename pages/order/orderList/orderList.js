// pages/order/orderList/orderList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo:1,
    number:10,
    lastPage:false,
    orderList:[],
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
    this.getOrderList()
    wx.stopPullDownRefresh()

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
    this.setData({
      pageNo: 1,
      number: 10,
      lastPage: false,
      orderList: [],
    })
    this.onShow()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getOrderList: function (e) {
    if (this.data.lastPage) return
    let url = '/home/ticketOrder/listData'
    let pageNo = this.data.pageNo
    let data = {
      pageNo: this.data.pageNo,
      number: this.data.number,
    }
    app.request('get', url, data, (res) => {
      let orderVOList = res.data.orderVOList
      let orderList = this.data.orderList.concat(orderVOList)
      console.info(orderList)
      this.setData({
        orderList,
        pageNo
      })
      pageNo++
      if (orderVOList.length < this.data.number) {
        this.setData({
          lastPage: true
        })

      }
    })

  },
  toOrderDetail: function (e) {
    let orderId = e.currentTarget.dataset.id
    let url = '/pages/order/orderDetail/orderDetail?orderId=' + orderId
    wx.navigateTo({
      url: url
    })
  }
})