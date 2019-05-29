// pages/cinema/cinemaList/cinemaList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    nowCity: '上海',
    cityCode: '310100',
    cinemaLineId:'',
    lat: '',
    lng: '',
    region: ['广东省', '广州市', '海珠区'],
    regionNo: 0,
    sortTypeList: [{
      value: '综合排序'
    }, {
      value: '离我最近'
    }
    ],
    sortTypeNo: 0,
    cinemaLine: ['全部院线', '院线1', '院线2', '院线3'],
    cinemaLineNo: 0,
    cityList: [],
    cinemaList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cityCode = options.cityCode
    let movieId = options.movieId
    this.setData({
      movieId,
    })
    this.getCityList()
    this.getCinemaLine()
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
    this.setData({
      pageNo: 1,
      nowCity: '上海',
      cityCode: '310100',
      cinemaLineId:'',
      lat: '',
      lng: '',
      region: ['广东省', '广州市', '海珠区'],
      regionNo: 0,
      sortTypeList: [
        {
          value: '综合排序'
        }, {
          value: '离我最近'
        }
      ],
      sortTypeNo: 0,
      cinemaLineList: [],
      cinemaLineNo: 0,
      cityList: [],
      cinemaList: []
    })
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
    this.setData({
      regionNo: e.detail.value,
    })
  },
  toCinemaToMovie: function (e) {
    let cinemaId = e.currentTarget.dataset.id
    let movieId = this.data.movieId
    let url = "/pages/movie/movieScene/movieScene?cinemaId=" + cinemaId + "&movieId=" + movieId
    wx.navigateTo({
      url: url
    })
  },
  getCinemaList: function (type) {
    let url = "/cinema/listData"
    let pageNo = this.data.pageNo
    let data = {
      cityCode: this.data.cityCode,
      movieId: this.data.movieId,
      pageNo,
      cinemaLineId: this.data.cinemaLineId,
      lat: this.data.lat,
      lng: this.data.lng
    }
    app.request('get', url, data, (res) => {
      console.info(res.data)
      pageNo++
      this.setData({
        cinemaList: res.data.cinemaVOList,
        pageNo
      })
    })
  },
  getCityList: function (type) {
    let url = '/openCity/listData'
    let data = {

    }
    app.request('get', url, data, (res) => {
      this.setData({
        cityList: res.data.openCityList
      })

    })
  },
  tabSortType: function (e) {
    let val = e.detail.value
    let sortTypeList = this.data.sortTypeList
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        let latitude = res.latitude
        let longitude = res.longitude
        let speed = res.speed
        let accuracy = res.accuracy
        let url = '/cinema/listData';
        that.setData({
          lat: latitude,
          lng: longitude,
          sortTypeNo: val,
          pageNo: 1,
          lastPage: false
        })
        // wx.openLocation({
        //   latitude,
        //   longitude
        // })
        that.getCinemaList()
      },
      fail(res) {
        console.info('失败')
        wx.showModal({
          title: '提示',
          content: '如果您不进行授权，无法使用此功能，点击确定去授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.openSetting({
                success(res) {
                  console.log(res.authSetting)
                  // res.authSetting = {
                  //   "scope.userInfo": true,
                  //   "scope.userLocation": true
                  // }
                }
              })
            }
          }
        })
      }
    })
    console.info('picker发送选择改变，携带值为', e.detail.value)

  },
  tabCinemaLine: function (e) {
    let val = e.detail.value
    let cinemaLineList = this.data.cinemaLineList
    let cinemaLineId = cinemaLineList[val].cinemaLineId
    this.setData({
      cinemaLineNo: val,
      cinemaLineId,
      pageNo: 1,
      lastPage: false
    })
    this.getCinemaList()

  },
  toCityList: function (e) {
    let url = "/pages/cityList/cityList"
    wx.navigateTo({
      url: url
    })
  },
  getCinemaLine: function () {
    let url = "/cinemaLine/listData"
    let data = {}
    app.request('get', url, data, (res) => {
      let cinemaLineList = [{
        name: '全部院线',
        cinemaLineId: ''
      }]
      cinemaLineList = cinemaLineList.concat(res.data.cinemaLineVOList)
      console.info(cinemaLineList)
      this.setData({
        cinemaLineList
      })
    })
  }

})