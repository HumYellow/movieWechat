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
    orderList: [],
    getTime: [],
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
    let _that = this
    let getTime = this.data.getTime
    for (let i = 0; i < getTime.length; i++) {
      clearTimeout(this.data.getTime[i])
    }
    wx.showLoading({
      title: '加载中'
    })
    this.setData({
      pageNo: 1,
      lastPage: false,
      orderList: [],
    }, function(){
      this.getOrderList()
    })
    
    wx.stopPullDownRefresh()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let getTime = this.data.getTime
    for (let i = 0; i < getTime.length; i++) {
      clearTimeout(this.data.getTime[i])
    }
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
    let _that = this
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
      pageNo++
      this.setData({
        orderList,
        pageNo
      })
      for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].busStatus == 'new') {
          _that.leftTimeFn(i)
        }
      }
      if (orderVOList.length < this.data.number) {
        this.setData({
          lastPage: true
        })

      }
    })

  },
  toOrderDetail: function (e) {
    let orderId = e.currentTarget.dataset.id
    let isNew = e.currentTarget.dataset.state == 'new'
    let url = isNew ? '/pages/order/confirmOrder/confirmOrder?orderId=' + orderId:'/pages/order/orderDetail/orderDetail?orderId=' + orderId
    wx.navigateTo({
      url: url
    })
  },
  leftTimeFn: function (i) {
    let nowTime = new Date()
    let overTime = this.data.orderList[i].validTimeMs
    let leftTime = overTime - nowTime.getTime()
    this.countDown(leftTime,i)
  },
  countDown: function (leftTime, i) {
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
    var leftTimeNo = 'orderList[' + i + '].leftTime'
    this.setData({
      [leftTimeNo]: countdownData.min + ':' + countdownData.sec,
    })
    const that = this
    that.setData({
      ['getTime['+i+']']: setTimeout(function () {
        if (leftTime <= 0) {
          that.onShow()
          return
        } else {
          that.countDown(leftTime - 1000,i)
        }
      }, 1000)
    })

  },
})