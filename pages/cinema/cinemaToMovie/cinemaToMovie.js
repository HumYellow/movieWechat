// pages/movie/movieList/movieList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listTabType: 1,
    pageType: 'movieList',
    movie: null, //选中的电影
    movies: null, //电影列表
    movieList: [{
      id: '1',
      name: '大闹天宫',
      price: '35.5',
      score: '5.0',
      pic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
    }, {
      id: '2',
      name: '复仇者联盟',
      price: '45.5',
      score: '3.0',
      pic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
    }, {
      id: '3',
      name: '马可波罗历险记',
      price: '25.5',
      score: '5.0',
      pic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
    },],
    movieList1: [{
      id: '1',
      name: '大闹天宫',
      price: '35.5',
      score: '5.0',
      pic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
    }, {
      id: '2',
      name: '复仇者联盟',
      price: '45.5',
      score: '3.0',
      pic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
    }, {
      id: '3',
      name: '马可波罗历险记',
      price: '25.5',
      score: '5.0',
      pic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
    },],
    movieList2: [{
      id: '1',
      name: '大闹天宫2',
      price: '35.5',
      score: '5.0',
      pic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
    }, {
      id: '2',
      name: '复仇者联盟2',
      price: '45.5',
      score: '3.0',
      pic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
    }, {
      id: '3',
      name: '马可波罗历险记2',
      price: '25.5',
      score: '5.0',
      pic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  tabMovieList: function (e) {
    let tabType = e.currentTarget.dataset.tabtype
    let movieList = tabType == 1 ? this.data.movieList1 : this.data.movieList2
    console.info(movieList)
    this.setData({
      listTabType: tabType,
      movieList: movieList
    })

  },
  toMovieScene: function (e) {
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieScene/movieScene?id=" + movieId
    wx.navigateTo({
      url: url
    })
  }
})