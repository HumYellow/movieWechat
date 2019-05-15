// pages/movie/movieDetails/movieDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId:'',
    movieName:'',
    movieImg:'',
    movieType:'',
    movieSummary:'',
    movieDate:'',
    movieVideoList:[
      {
        pic: "https://img1.doubanio.com/view/photo/l/public/p2552111746.webp",
        id:'2'
      },

    ],
    movieStaffList:[
      {
        id:1,
        name:'安东尼·罗',
        title:'导演',
        img:'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51466.webp'
      },
      {
        id: 2,
        name: '安东尼·罗',
        title: '导演',
        img: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51466.webp'
      },
      {
        id: 3,
        name: '安东尼·罗',
        title: '导演',
        img: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51466.webp'
      },
      {
        id: 4,
        name: '安东尼·罗',
        title: '导演',
        img: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51466.webp'
      },
      {
        id: 5,
        name: '安东尼·罗',
        title: '导演/制片主任',
        img: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51466.webp'
      },
      {
        id: 6,
        name: '安东尼·罗',
        title: '导演',
        img: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51466.webp'
      },
      {
        id: 7,
        name: '安东尼·罗',
        title: '导演',
        img: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51466.webp'
      }
    ],
    picList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movieId = options.movieId
    console.info(movieId)
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
      var imgList = event.currentTarget.dataset.list;//获取data-list
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
  },
  movieToCinema: function (e) {
    let movieId = this.data.movieId
    console.info(movieId)
    let url = "/pages/movie/movieToCinema/movieToCinema?movieId=" + movieId
    wx.navigateTo({
      url: url
    })
  },
  toVideo: function (e) {
    let movieId = this.data.movieId
    let url = "/pages/movie/movieVideo/movieVideo?id=" + movieId
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
    console.info(movieId)
    let data = {
      id: id
    }
    app.request('get', url, data, (res) => {
        this.setData({
          movieName: res.data.name,
          movieImg: res.data.img,
          movieType: res.data.type,
          movieSummary: res.data.name,
          movieDate: res.data.releaseDate,
        })
    })
  },
  getMoviePhoto:function(movieId){
    let url = "/photo/listData";
    let data = {
      id: movieId
    }
    app.request('get', url, data, (res) => {
      this.setData({
        picList: res.data.photoVOList,
      })
    })
  },
  getMovieVideo: function (movieId){
    let url = "/video/listData"
    let data = {
      id: movieId
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
      id: movieId
    }
    app.request('get', url, data, (res) => {
      this.setData({
        movieStaffList: res.data.castVOList,
      })
    })

  }

})