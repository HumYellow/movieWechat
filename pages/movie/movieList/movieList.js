// pages/movie/movieList/movieList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageType: 'movieList',
    movie: null, //选中的电影
    movies: null, //电影列表
    movieList:[{
      id:'1',
      name:'大闹天宫',
      price:'35.5',
      score:'5.0'
    }, {
      id: '2',
      name: '复仇者联盟',
      price: '45.5',
      score: '3.0'
    }, {
      id: '3',
      name: '马可波罗历险记',
      price: '25.5',
      score: '5.0'
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
  toMovieDetails: function (e) {
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieDetails/movieDetails?id=" + movieId
    wx.navigateTo({
      url:url
    })
  }
})