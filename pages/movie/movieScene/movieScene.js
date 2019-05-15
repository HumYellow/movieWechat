// pages/movie/movieScene/movieScene.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    movieId:3,
    cinemaId:12,
    cinemaDetails: {},
    time: {},//当前日期场次
    timeList:[],//所有场次列表
    movieList: [{
      id: '1',
      name: '大闹天宫',
      price: '35.5',
      score: '5.0',
      img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2552058346.webp'
    }, {
      id: '2',
      name: '复仇者联盟',
      price: '45.5',
      score: '3.0',
        img: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
    }, {
      id: '3',
      name: '马可波罗历险记',
      price: '25.5',
      score: '5.0',
        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2542973862.jpg'
      }, {
        id: '4',
        name: '马可波罗历险记',
        price: '25.5',
        score: '5.0',
        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2542973862.jpg'
      }, {
        id: '5',
        name: '马可波罗历险记',
        price: '25.5',
        score: '5.0',
        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2542973862.jpg'
      }, {
        id: '6',
        name: '马可波罗历险记',
        price: '25.5',
        score: '5.0',
        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2542973862.jpg'
      },
    ],
    movieSceneList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/order/seatSelection/seatSelection?id=" + movieId
    wx.navigateTo({
      url: url
    })
  },
  toMap:function(){
    wx.openLocation({
      latitude: 40.058692,
      longitude: 116.30799,
      name: "七十一号豆汤饭",
      address: '七十一号豆汤饭',
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