// pages/order/confirmOrder/confirmOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount1: ['优惠活动1-1', '优惠活动1-2', '优惠活动1-3', '优惠活动1-4'],
    discount2: ['优惠活动2-1', '优惠活动2-2', '优惠活动2-3', '优惠活动2-4'],
    discount3: ['优惠活动3-1', '惠活动3-2', '惠活动3-3', '惠活动3-4'],
    orderDetail:{},
    leftTime:'',
    getTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderId = options.orderId
    this.getOrderDetail(orderId)
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
    clearTimeout(this.data.getTime)
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
  bindRegionChangeLine: function (e) {
    console.info('picker发送选择改变，携带值为', e.detail.value)
  },
  getOrderDetail: function (orderId){
    let orderDetail = this.data.orderDetail
    let url = "/order/payDetailData"
    let data = {
      orderId: orderId
    }
    app.request('get', url, data, (res) => {
      console.info(res.data)
      this.setData({
        orderDetail:res.data
      },()=>{
        this.leftTimeFn()
      })
      
    })
  },
  toPay:function(e){

  },
  leftTimeFn: function () {
    let nowTime = new Date()
    let overTime = this.data.orderDetail.validTimeMs
    let leftTime = overTime - nowTime.getTime()
    this.countDown(leftTime)
  },
  countDown: function (leftTime){
    const msec = parseInt(leftTime / 1000)
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
      leftTime: countdownData.min +':'+countdownData.sec,
    })
    const that = this
    that.setData({
      getTime: setTimeout(function () {
        if (leftTime <= 0) {
          wx.showModal({
            title: '提示',
            content: '此订单已过期！请重新下单',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack()
              } else if (res.cancel) {
                wx.navigateBack()
              }
            }
          })
          clearTimeout(getTime)
          return
        } else {
          that.countDown(leftTime - 1000)
        }
      }, 1000)
    })
    
  }
})