//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageType: 'index',
    swiperSelect:0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bannerList: [],
    bannerList2: '',
    movieListHot:[],
    movieListSoon:[]
  },
  //事件处理函数
  bannerLink: function(e) {
    console.info(e)
    let link = e.currentTarget.dataset.link

    console.info(link)
    if (link.type == 1) {
      app.toSelfPage(link.url)
    } else if (link.type==2){
      app.linkToWap(link.url)
    } else if (link.type==3){
      app.toOther(link.appId, link.url)
    }
  },
  onLoad: function () {
    wx.showLoading({
      title:'加载中'
    })
    this.getBannerList()
    this.getBannerList2()
    this.getHotMovie()
    this.getSoonMovie()
    wx.stopPullDownRefresh()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageType: 'index',
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      bannerList: [],
      bannerList2: '',
      movieListHot: [],
      movieListSoon: []
    })
    this.onLoad()
  },
  toMovieDetails: function (e) {
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieDetails/movieDetails?movieId=" + movieId
    wx.navigateTo({
      url: url
    })
  },
  movieToCinema: function (e) {
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieToCinema/movieToCinema?movieId=" + movieId
    wx.navigateTo({
      url: url
    })
  },
  toTabBar: function (e) {
    app.globalData.movieListType = e.currentTarget.dataset.tab; 
    let url = e.currentTarget.dataset.url
    app.toTabBar(url)
  },
  getBannerList: function () {
    let url = '/recommend/bannerListData'
    let data = {
      type: 1,
    }
    app.request('get', url, data, (res) => {//获取订单ID
      this.setData({
        bannerList: res.data.recommendBannerVOList
      })
    })
  },
  getBannerList2: function () {
    let url = '/recommend/bannerListData'
    let data = {
      type: 3,
      number: 1
    }
    app.request('get', url, data, (res) => {//获取订单ID
      this.setData({
        bannerList2: res.data.recommendBannerVOList
      })
    })
  },
  getHotMovie: function () {
    let url = '/recommend/movieListData'
    let data = {
      type: 2,
    }
    app.request('get', url, data, (res) => {//获取订单ID
      this.setData({
        movieListHot: res.data.recommendMovieVOList
      })
    })
  },
  getSoonMovie: function () {
    let url = '/recommend/movieListData'
    let data = {
      type: 4,
    }
    app.request('get', url, data, (res) => {//获取订单ID
      this.setData({
        movieListSoon: res.data.recommendMovieVOList
      })
    })
  },
  tabSwiper: function (e){
    let current = e.detail.current
    this.setData({
      swiperSelect: current
    })
  }
})
