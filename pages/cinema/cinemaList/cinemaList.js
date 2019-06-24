// pages/cinema/cinemaList/cinemaList.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageType:'cinemaList',
    sortType:'',
    pageNo:1,
    number:10,
    cinemaLineId: '',
    labelId: '',
    lastPage:false,
    cityNow:'',
    lat:'',
    lng:'',
    sortTypeList: [{
        value: '综合排序',
        sortType:'',
      }, {
        value: '离我最近',
        sortType: 'distance',
      }
    ],
    sortTypeNo: 0,
    cinemaLineList: [],
    cinemaLineNo: 0,
    countyList: [],
    countyListNo: 0,
    countyCode:'',
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
    this.getCinemaLine()
    this.getCountyList()
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
  onShow: function () {
    this.getCityNow()
    this.sortGetCinemaList('distance')
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
      lastPage: false,
      cinemaList: '',
    })
    this.onLoad()
    this.onShow()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getCinemaList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindRegionChange :function(e){
    console.info('picker发送选择改变，携带值为', e.detail.value)
  },
  bindRegionChangeLine: function (e) {
    this.setData({
      regionNo: e.detail.value,
    })
  },
  toCinemaToMovie: function (e) {
    let cinemaId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieScene/movieScene?cinemaId=" + cinemaId
    wx.navigateTo({
      url: url
    })
  },
  getCinemaList:function(type){//获取影院列表，设置条件重复调用
    if (this.data.lastPage)return
    let url = "/cinema/listData"
    let pageNo = this.data.pageNo
    let data = {
      pageNo,
      sortType: this.data.sortType,
      lat: this.data.lat,
      lng: this.data.lng,
      cinemaLineId: this.data.cinemaLineId,
      countyCode: this.data.countyCode,
      labelId: this.data.labelId
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
  tabSortType: function (e) {
    let val = e.detail.value
    let sortTypeList = this.data.sortTypeList
    let sortType = sortTypeList[val].sortType
    this.sortGetCinemaList(sortType)
    this.setData({
      sortTypeNo: val
    })
  },
  sortGetCinemaList: function (sortType) {
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
          pageNo: 1,
          sortType,
          lastPage: false
        })
        that.getCinemaList()
      },
      fail(res) {
        wx.showModal({
          title: '提示',
          content: '如果您不进行授权，无法使用定位，点击确定去授权',
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
        that.getCinemaList()
      }
    })
  },
  tabCinemaLine: function (e) {
    let val = e.detail.value
    let cinemaLineList = this.data.cinemaLineList
    let cinemaLineId = cinemaLineList[val].cinemaLineId
    this.setData({
      cinemaLineNo:val,
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
  getCityNow:function(){
    let cityNow = wx.getStorageSync('cityNow')
    this.setData({
      cityNow
    })
  },
  getLabelList:function(){
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
  tabLabel: function (e) {
    let val = e.detail.value
    let labelList = this.data.labelList
    let labelId = labelList[val].id
    this.setData({
      labelListNo: val,
      labelId,
      pageNo: 1,
      lastPage: false
    })
    this.getCinemaList()

  },

})