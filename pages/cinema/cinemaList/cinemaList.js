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
    cinemaLineId:'',
    lastPage:false,
    nowCity:'上海',
    cityCode:'310100',
    lat:'',
    lng:'',
    region: ['广东省', '广州市', '海珠区'],
    regionNo: 0,
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
    cinemaLineNo:0,
    cityList: [],
    cinemaList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //let cityCode = options.cityCode
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
    this.onLoad()
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
  getCinemaList:function(type){
    if (this.data.lastPage)return
    let url = "/cinema/listData"
    let pageNo = this.data.pageNo
    let data = {
      cityCode: this.data.cityCode,
      pageNo,
      sortType: this.data.sortType,
      lat: this.data.lat,
      lng: this.data.lng,
      cinemaLineId: this.data.cinemaLineId
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
  tabSortType: function (e) {
    let val = e.detail.value
    let sortTypeList = this.data.sortTypeList
    let sortType = sortTypeList[val].sortType
    console.info(sortType)
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
          lastPage:false
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
      cinemaLineNo:val,
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
        cinemaLineId:''
      }]
      cinemaLineList = cinemaLineList.concat(res.data.cinemaLineVOList)
      this.setData({
        cinemaLineList
      })
    })
   
    
  }


})