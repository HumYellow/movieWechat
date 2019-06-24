// pages/myCenter/cardDetail/cardDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardId:null,
    cardDetail:{},
    cardPopupShow:false,
    cardList:[],
    balanceNumber:null,
    cardPassword:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    console.info(options)
    this.setData({
      cardId: options.cardId
    })
    this.getCardDetail()
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
  getCardDetail: function () {
    let url = "/home/vip/cardDetails"
    let data = {
      cardId: this.data.cardId
    }
    app.request('get', url, data, (res) => {
      console.info(res.data)
      let cardList = [];
      cardList[0] = res.data
      this.setData({
        cardDetail: res.data,
        cardList: cardList
      })
      console.info(this.data.cardList)
    })

  },
  checkBalance:function(){
    if (this.data.cardDetail.pin){
      this.getBalance()
    } else {
      this.setData({
        cardPopupShow: true
      })
    }
  },
  closePopup: function () {
    this.setData({
      cardPopupShow: false
    })
  },
  getBalance: function () {
    let url = "/home/vip/refreshCardBalance"
    let data = {
      cardId: this.data.cardId,
      pinNumber: this.data.cardPassword
    }
    app.request('get', url, data, (res) => {
      wx.showToast({
        title: '余额已显示',
        icon: 'success'
      });
      console.info(res.data)
      this.setData({
        balanceNumber: res.data
      })
      this.closePopup()
    })

  },
  pushPassword: function (e) { 
    let card = e.detail.card
    let cardPassword = card.cardPassword
    this.setData({
      cardPassword
    })
    this.getBalance()
  }
})