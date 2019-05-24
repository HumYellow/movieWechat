// pages/movie/movieList/movieList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listTabType:'movieIng',
    pageType: 'movieList',
    lastPage: false,
    number:10,
    movieIng: {
      pageNo: 1,
      lastPage: false,
      movieList: [],
    },
    movieSoon: {
      pageNo: 1,
      lastPage: false,
      movieList: [],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//查看是否带切换参数，如果不带正常请求
    let listTabType = app.globalData.movieListType
    if (!listTabType)this.getMovieList()
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
  onShow: function () {//查看是否带切换参数，如果带，按照参数切换，然后清空
    let listTabType = app.globalData.movieListType
    if (listTabType){
      this.tabMovieListFn(listTabType)
      app.globalData.movieListType = null
    }

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
    this.getMovieList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMovieList: function (e) {
    let movieBox = this.data.listTabType == 'movieIng' ? this.data.movieIng : this.data.movieSoon
    if (movieBox.lastPage)return
    let url = this.data.listTabType == 'movieIng' ? "/movie/listCurrentHotData" : "/movie/listCurrentSoonData"
    let data = {
      pageNo: movieBox.pageNo,
      number: this.data.number
    }
    app.request('get', url, data, (res) => {
      let pageNo = movieBox.pageNo
      let movieListNew = res.data.movieVOList
      pageNo++
      if (movieListNew.length < this.data.number){//最后一页
        let lastPage = this.data.listTabType + ".lastPage"
          this.setData({
            [lastPage]: true
          })
      }
      let movieListText = this.data.listTabType + ".movieList"
      let pageNoText = this.data.listTabType + ".pageNo"
      let movieList = movieBox.movieList.concat(res.data.movieVOList)
      this.setData({//加载下一页
        [movieListText]: movieList,
        [pageNoText]: pageNo
      })
    }, (err) => {
      console.log(err)
    })
    
  },
  tabMovieList: function (e) {
    let tabType = e.currentTarget.dataset.tabtype
    this.tabMovieListFn(tabType)
  },
  tabMovieListFn: function (tabType) {
    this.setData({//修改tab切换type
      listTabType: tabType,
    })
    let movieBox = this.data.listTabType == 'movieIng' ? this.data.movieIng : this.data.movieSoon
    let movieList = movieBox.movieList
    if (movieBox.pageNo == 1) {//根据type，如果没请求过，去请求数据
      this.getMovieList()
    }

  },
  toMovieDetails: function (e) {
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieDetails/movieDetails?movieId=" + movieId
    wx.navigateTo({
      url:url
    })
  },
  movieToCinema: function (e) {
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieToCinema/movieToCinema?movieId=" + movieId
    wx.navigateTo({
      url: url
    })
  },
  toCityList:function(e){
    
  }
})