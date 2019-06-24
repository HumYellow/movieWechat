// pages/myCenter/bindCard/bindCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cinemaId:'',
      cinemaDetail: {},
      memberCardNumber: '',
      pinNumber: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cinemaId = options.cinemaId
    this.setData({
      cinemaId
    })
    this.getCinema()
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
  getCardNumber: function (e) {
      let memberCardNumber = e.detail.value;
      this.setData({
        memberCardNumber
      })
  },
  getCardPassword:function(e){
    let pinNumber = e.detail.value;
    this.setData({
      pinNumber
    })
    
  },
  getCinema: function () {
    let url = "/cinema/detailData"
    let data = {
      id: this.data.cinemaId
    }
    app.request('get', url, data, (res) => {
      console.info(res.data)
      this.setData({
        cinemaDetail: res.data
      })
    })
  },
  bindCard: function () {
    wx.showLoading()
    let url = '/home/vip/member/validate';
    let data = {
      memberCardNumber: this.data.memberCardNumber,
      pinNumber: this.data.pinNumber,
      cinemaId:this.data.cinemaId
    }
    app.request('post', url, data, (res) => {
      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 4000
      })
      this.setData({
        memberCardNumber: null,
        pinNumber: null
      })
    })

  },
})