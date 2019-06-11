// pages/movie/movieDetails/movieDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId:'',
    movieDetails:'',
    movieVideoList:[],
    movieStaffList:[],
    picList:[],
    imgList:[],
    scoreShow:false,
    scoreNo:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movieId = options.movieId
    this.setData({
      movieId
    })
    this.getMovieDetails(movieId)//获取电影信息
    this.getMoviePhoto(movieId)//获取电影剧照
    this.getMovieVideo(movieId)//获取电影预告片
    this.getMovieStaff(movieId)//获取电影演职人员
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = this.data.imgList;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  movieToCinema: function (e) {
    let movieId = this.data.movieId
    let url = "/pages/movie/movieToCinema/movieToCinema?movieId=" + movieId
    wx.navigateTo({
      url: url
    })
  },
  toVideoList: function (e) {
    let movieId = this.data.movieId
    let url = "/pages/movie/movieVideo/movieVideo?movieId=" + movieId
    wx.navigateTo({
      url: url
    })

  },
  toPic: function (e) {
    let movieId = this.data.movieId
    let url = "/pages/movie/moviePic/moviePic?movieId=" + movieId
    wx.navigateTo({
      url: url
    })
  },
  getMovieDetails: function (movieId){
    let id = movieId, url = "/movie/detailData"
    let data = {
      id: id
    }
    app.request('get', url, data, (res) => {
      this.setData({
        movieDetails: res.data
      })
    })
  },
  getMoviePhoto:function(movieId){
    let url = "/photo/listData";
    let imgList = []
    let data = {
      relatedId: movieId
    }
    app.request('get', url, data, (res) => {
      let picList = res.data.photoVOList
      for (let i = 0; i < picList.length; i++) {
        imgList.push(picList[i].img)
      }
      this.setData({
        picList,
        imgList
      })
    })
  },
  getMovieVideo: function (movieId){
    let url = "/video/listData"
    let data = {
      relatedId: movieId
    }
    app.request('get', url, data, (res) => {
      this.setData({
        movieVideoList: res.data.videoVOList,
      })
    })

  },
  getMovieStaff: function (movieId) {
    let url = "/cast/listData"
    let data = {
      movieId: movieId
    }
    app.request('get', url, data, (res) => {
      this.setData({
        movieStaffList: res.data.castVOList,
      })
    })

  },
  scoreSelect:function(){
    this.setData({
      scoreShow:true
    })
  },
  closePopup: function () {
    this.setData({
      scoreShow: false
    })
    this.getScore()
    
  },
  getScore: function () {
    let type = 2, relatedId = this.data.movieId, url = '/home/score/detailData';
    let data = {
      type,
      relatedId: relatedId
    }
    app.request('get', url, data, (res) => {
      if (res.data.score) {
        console.info(res.data.score)
        this.setData({
          scoreNo: res.data.score,
          'movieDetails.memberScore': res.data.score
        })

      }
    })

  },
  wantWatch:function(){
    let url,hasCollect = this.data.movieDetails.hasCollect;
    let data = {
      type:2,
      relatedId:this.data.movieId
    }
    if (hasCollect){
      url = '/home/collect/deleteData'
    }else{
      url = '/home/collect/saveData'
    }
    app.request('post', url, data, (res) => {
        hasCollect = !hasCollect
        this.setData({
          'movieDetails.hasCollect': hasCollect
        })
        if (hasCollect){
            wx.showToast({
              title: '已关注',
              icon: 'succes',
              duration: 1500,
              mask: true
            })
        } else {
            wx.showToast({
              title: '已取消关注',
              icon: 'succes',
              duration: 1500,
              mask: true
            })
        }
    })

  }

})