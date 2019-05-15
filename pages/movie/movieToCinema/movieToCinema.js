// pages/cinema/cinemaList/cinemaList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId:'',
    pageType: 'cinemaList',
    nowCity: '上海',
    region: ['广东省', '广州市', '海珠区'],
    index: 0,
    cinemaLine: ['全部院线', '院线1', '院线2', '院线3'],
    cityList: [{
      id: 0,
      name: '美国'
    },
    {
      id: 1,
      name: '中国'
    },
    {
      id: 2,
      name: '巴西'
    },
    {
      id: 3,
      name: '日本'
    }],
    cinemaList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cityCode = options.cityCode
    this.setData({
      movieId: options.movieId
    })
    this.getCityList(cityCode)
    this.getCinemaList()
    wx.stopPullDownRefresh()

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
    this.onLoad()
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
  bindRegionChangeLine: function (e) {
    console.info('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value
    let city = this.data.cityList[index]
    let cityCode = city.cityCode
    this.setData({
      index: e.detail.value,
    })
    this.getCinemaList(cityCode)
  },
  toMovieScene: function (e) {
    let cinemaId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieScene/movieScene?movieId=" + this.data.movieId + "&cinemaId=" + cinemaId
    wx.navigateTo({
      url
    })
  },
  getCityList: function () {
    let url = '/openCity/listData'
    let data = {}
    app.request('get', url, data, (res) => {
      this.setData({
        cityList: res.data.openCityList
      })
    })

  },
  getCinemaList: function (cityCode) {
    let url = "/cinema/listData"
    let data = {
      cityCode: cityCode ? cityCode : '310100'
    }
    app.request('get', url, data, (res) => {
      this.setData({
        cinemaList: res.data.cinemaVOList
      })
    })
  }

})