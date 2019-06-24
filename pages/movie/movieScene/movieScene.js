// pages/movie/movieScene/movieScene.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:null,
    movieId:'',
    cinemaId:'',
    cinemaDetails: {},
    time: {},//当前日期场次
    timeList:[],//所有场次列表
    movieList: [],
    movieSceneList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    let cinemaId = options.cinemaId ? options.cinemaId:''
    let movieId = options.movieId ? options.movieId:''
    this.setData({
      cinemaId,
      movieId
    })
    this.getCinemaDetails(cinemaId)//获取影院详情
    this.getSceneList(cinemaId)//获取影院场次
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
  selectMovie(e) {//组件选择电影后调用此方法
    let movie = e.detail.movie
    let movieId = movie.movieId
    let movieSceneList = this.data.movieSceneList
    let time,timeList;
    for (let i = 0; i < movieSceneList.length;i++){
      if (movieSceneList[i].movieId == movieId) {//根据ID查询场次
        timeList = movieSceneList[i].playDateItemList
      }
    }
    time = timeList[0]//第一天场次默认选中
    this.setData({
      movie,
      movieId,
      time,
      timeList
    })
  },
  selectTime: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      time: this.data.timeList[index]
    })
  },
  toSeat: function (e) {
    let mpiId = e.currentTarget.dataset.id
    let url = "/pages/order/seatSelection/seatSelection?mpiId=" + mpiId
    wx.navigateTo({
      url: url
    })
  },
  toBindCard: function () {
    let cinemaId = this.data.cinemaId
    let url = "/pages/myCenter/bindCard/bindCard?cinemaId=" + cinemaId
    wx.navigateTo({
      url: url
    })
  },
  toMap:function(){
    let pointX = this.data.cinemaDetails.pointX
    let pointY = this.data.cinemaDetails.pointY
    let cinemaName = this.data.cinemaDetails.name
    let address = this.data.cinemaDetails.address 
    console.info(pointX)
    wx.openLocation({
      latitude: parseFloat(pointX),
      longitude: parseFloat(pointY),
      name: cinemaName,
      address: address,
      scale: 28
    })
      
  },
  getCinemaDetails: function (cinemaId) {
    let url = "/cinema/detailData"
    let data = {
      id: cinemaId
    }
    app.request('get', url, data, (res) => {
        this.setData({
          cinemaDetails:res.data
        })
    })
  },
  getSceneList: function (cinemaId) {
    let url = "/playItem/listData"
    let data = {
      cinemaId: cinemaId
    }
    app.request('get', url, data, (res) => {
      this.setData({
        movieSceneList: res.data.moviePlayList
      })
    })
  }
})