// pages/myCenter/wantWacth/wantWatch.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      watchList:[],
      pageNo:1,
      number:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    this.getWatchList()
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
  getWatchList:function(){
    let url ="/home/collect/listData";
    let data={
        type:2,
        pageNo: this.data.pageNo,
        number: this.data.number
    }
    app.request('get', url, data, (res) => {
      this.setData({
        watchList: res.data.movieList
      })
      console.info(this.data.watchList)
    })
  },
  toMovieDetails: function (e) {
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieDetails/movieDetails?movieId=" + movieId
    wx.navigateTo({
      url: url
    })
  },
})