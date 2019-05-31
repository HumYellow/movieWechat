// pages/movie/movieVideo/movieVideo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId:'',
    videoList:[],
    selectVideoIndex:0,
    videoPlayItem:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movieId = options.movieId
    this.setData({
      movieId
    })
    this.getVideoList()
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
  toBuy: function (e) {
    let movieId = this.data.movieId
    let url = "/pages/movie/movieToCinema/movieToCinema?movieId=" + movieId
    wx.redirectTo({
      url: url
    })
  },
  getVideoList:function(){
    let url = "/video/listData"
    let data = {
      relatedId:this.data.movieId
    }
    app.request('get', url, data, (res) => {
      let videoList = res.data.videoVOList
      let selectVideoIndex = this.data.selectVideoIndex
      this.setData({
        videoList,
        videoPlayItem: videoList[selectVideoIndex]
      })
    })
  },
  videoSelect: function (e) {
    let videoList = this.data.videoList
    let selectVideoIndex = this.data.selectVideoIndex
    let selectIndex = e.currentTarget.dataset.index
    console.info(selectIndex)
    console.info(videoList)
    this.setData({
      videoPlayItem: videoList[selectIndex]
    })

  }
})