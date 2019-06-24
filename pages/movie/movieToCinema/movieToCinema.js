// pages/cinema/cinemaList/cinemaList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    number: 10,
    sortType: '',
    nowCity: '',
    cinemaLineId:'',
    lat: '',
    lng: '',
    movieDetails:{},
    sortTypeList: [{
        value: '综合排序',
        sortType: '',
      }, {
        value: '离我最近',
        sortType: 'distance',
      }
    ],
    sortTypeNo: 0,
    cinemaLineList: ['全部院线', '院线1', '院线2', '院线3'],
    cinemaLineNo: 0,
    countyList: [],
    countyListNo: 0,
    countyCode: '',
    cityList: [],
    cinemaList: [],
    labelList: [],
    labelListNo: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    let movieId = options.movieId
    this.setData({
      pageNo: 1,
      movieId,
      lastPage: false,
      cinemaList: '',
    })
    this.getMovieDetails()
    this.getCinemaLine()
    this.getCountyList()
    this.getCinemaList()
    this.getCityNow()
    this.getLabelList()
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
  onShow: function (options) {

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
  getMovieDetails: function () {
    let id = this.data.movieId, url = "/movie/detailData"
    let data = {
      id
    }
    app.request('get', url, data, (res) => {
      this.setData({
        movieDetails: res.data
      })
    })
  },
  getCinemaList: function (type) {
    if (this.data.lastPage) return
    let url = "/cinema/listData"
    let pageNo = this.data.pageNo
    let data = {
      movieId: this.data.movieId,
      pageNo,
      sortType: this.data.sortType,
      lat: this.data.lat,
      lng: this.data.lng,
      cinemaLineId: this.data.cinemaLineId,
      countyCode: this.data.countyCode
    }
    app.request('get', url, data, (res) => {
      let cinemaVOList = res.data.cinemaVOList
      let number = this.data.number
      let cinemaList = pageNo == 1 ? cinemaVOList : this.data.cinemaList.concat(cinemaVOList)
      pageNo++
      this.setData({
        cinemaList,
        pageNo
      })
      if (cinemaVOList.length < this.data.number) {
        this.setData({
          lastPage: true
        })
      }
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
  },
  getCountyList: function () {
    let url = "/city/listCountyData"
    let data = {}
    app.request('get', url, data, (res) => {
      console.info(res.data.countyVOList)
      let countyList = [{
        countyBriefName: '全部区域',
        countyCode: ''
      }]
      countyList = countyList.concat(res.data.countyVOList)
      this.setData({
        countyList
      })
    })
  },
  getLabelList: function () {
    let url = '/cinema/labelListData'
    app.request('get', url, '', (res) => {
      let labelList = [{
        name: '全部特色',
        labelId: ''
      }]
      labelList = labelList.concat(res.data.labelList)
      this.setData({
        labelList
      })
      console.info(this.data.labelList)
    })
  },
  tabSortType: function (e) {
    let val = e.detail.value
    let sortTypeList = this.data.sortTypeList
    let sortType = sortTypeList[val].sortType
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
          sortType,
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
  tabCounty: function (e) {
    let val = e.detail.value
    let countyList = this.data.countyList
    let countyCode = countyList[val].countyCode
    this.setData({
      countyListNo: val,
      countyCode,
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
  getCityNow: function () {
    let cityNow = wx.getStorageSync('cityNow')
    this.setData({
      cityNow
    })
  }
})