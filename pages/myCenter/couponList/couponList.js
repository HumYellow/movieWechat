// pages/myCenter/couponList/couponList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindCoupon:'',
    canUse:true,
    canUseList:[],
    canUseNo:1,
    canUseLast:true,
    cantUseList: [],
    cantUseNo: 1,
    cantUseLast: true,
    number:10
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
    wx.showLoading({
      title: '加载中'
    })
    this.setData({
      bindCoupon: '',
      canUse: true,
      canUseList: [],
      canUseNo: 1,
      canUseLast: true,
      cantUseList: [],
      cantUseNo: 1,
      cantUseLast: true,
    })
    this.getCanList()
    this.getCantList()

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
    if (this.data.canUse){
      this.getCanList()
    } else {
      this.getCantList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tabList:function(e){
    let type = e.currentTarget.dataset.type
    type = type == 'can' ? true : false
    let canUse = this.data.canUse
    if (type === canUse) return
    this.setData({
      canUse: !canUse
    })
  },
  getCanList: function () {
    let url = '/home/coupon/listData'
    let canUseNo = this.data.canUseNo
    let number = this.data.number
    let data = {
      validType:1,
      pageNo: canUseNo,
      number
    }
    app.request('get', url, data, (res) => {
      let canUseList = res.data.couponVOList
      if (!canUseList.length)return
      let canUseLast = true
      if (canUseList.length < number){
        canUseLast = true
      } else {
        canUseLast = false
        canUseNo++
      }
      this.setData({
        canUseList,
        canUseNo,
        canUseLast
      })
    })
    
  },
  getCantList: function () {
    let url = '/home/coupon/listData'
    let data = {
      validType: 0,
      pageNo: this.data.cantUseNo,
      number: this.data.number
    }
    app.request('get', url, data, (res) => {
      let cantUseList = res.data.couponVOList
      if (!cantUseList.length) return
      let cantUseLast = true
      if (cantUseList.length < number) {
        cantUseLast = true
      } else {
        cantUseLast = false
        cantUseNo++
      }
      this.setData({
        cantUseList,
        cantUseNo,
        cantUseLast
      })

    })

  },
  bindCouponInput:function(e){
    this.setData({
      bindCoupon: e.detail.value
    })
    //console.info(this.data.bindCoupon)
  },
  pushCouponCode:function(){
    let _that = this
    let bindCoupon = this.data.bindCoupon
    if (!this.data.bindCoupon){
      wx.showModal({
        title: '提示',
        content: '请输入票券号码',
        showCancel: false,
        success: function (res) {
        }
      })
      return
    }
    let url = '/home/coupon/bindData';
    let data = {
      couponPass: bindCoupon
    }
    app.request('post', url, data, (res) => {
      wx.showToast({
        title: '绑定成功',
        icon: 'succes',
        duration: 3000,
        mask: true,
        success: function () {
          _that.onShow()
        }
      })

    })
  }

})