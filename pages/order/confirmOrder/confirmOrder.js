// pages/order/confirmOrder/confirmOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount1: ['优惠活动1-1', '优惠活动1-2', '优惠活动1-3', '优惠活动1-4'],
    discount2: ['优惠活动2-1', '优惠活动2-2', '优惠活动2-3', '优惠活动2-4'],
    discount3: ['优惠活动3-1', '惠活动3-2', '惠活动3-3', '惠活动3-4'],
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
  bindRegionChange: function (e) {
    console.info('picker发送选择改变，携带值为', e.detail.value)
  },
})