// pages/order/confirmOrder/confirmOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    orderDetail:{},
    leftTime:'',
    getTime:'',
    useCard:false,
    couponPopupShow:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    let orderId = options.orderId
    this.setData({
      orderId
    })
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
      if (this.data.orderDetail.cinemaMemberVO){
          this.setData({
            useCard:true
          })
      }
    })
  },
  toPay:function(e){
    console.info(this.data.useCard)
    if(this.data.useCard){
      this.cardPay()
    } else {
      //this.falseOrder()//暂时直接跳转
      this.wxPay()
    }

  },
  cardPay: function () {
    let url = '/order/payMent';
    let data = {
      orderId: this.data.orderId,
      payMentType:1,
    }
    app.request('post', url, data, (res) => {
      console.info(res.data)
      this.toOrderDetail()
    })

  },
  wxPay: function () {
    let _that = this
    let url = '/order/payMent';
    let data = {
      orderId: this.data.orderId,
      payMentType: 2,
    }
    app.request('post', url, data, (res) => {
      console.info(res.data)
      app._pay(res.data, _that.toOrderDetail)
    })

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
          return
        } else {
          that.countDown(leftTime - 1000)
        }
      }, 1000)
    })
    
  },
  tabUseCard:function(){
    this.setData({
      useCard: !this.data.useCard
    })
  },
  toOrderDetail: function () {

    let url = '/wechatPay/queryOrder';
    let data = {
      orderId: this.data.orderId,
    }
    app.request('get', url, data, (res) => {
      console.info(res.data)
      // let orderId = this.data.orderId;
      // let url = '/pages/order/orderDetail/orderDetail?orderId=' + orderId
      // wx.navigateTo({
      //   url
      // })
    })

    
  },
  selectCoupon:function(){
    this.setData({
      couponPopupShow:true
    })
  },
  closePopup: function () {
    this.setData({
      couponPopupShow: false
    })

  },
  falseOrder:function(){
    let url = '/order/returnSuccessData';
    let data = {
      orderId:this.data.orderId
    }
    app.request('get', url, data, (res) => {
      this.toOrderDetail()
    })
  },
  selectCouponCallback: function () {
    console.info(22)
    this.setData({
      orderDetail: {},
      leftTime: '',
      getTime: '',
      useCard: false,
      couponPopupShow: false,
    })
    console.info(33)
    this.getOrderDetail(this.data.orderId)
  }

  
})