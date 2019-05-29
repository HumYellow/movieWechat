// pages/cityList/cityList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList:[],
    cityCode:'',
    cityNow:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getLocation()
    this.getNowCity()
    this.getCityList()
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
  getCityList: function () {
    let url = '/openCity/listData'
    let data = {

    }
    app.request('get', url, data, (res) => {
      this.setData({
        cityList: res.data.openCityList
      })
      console.info(this.data.cityList)

    })
  },
  getNowCity:function(){
    let cityNow = wx.getStorageSync('cityNow')
    let cityCode = wx.getStorageSync('cityCode')
    this.setData({
      cityNow,
      cityCode
    })
      
  },
  
})