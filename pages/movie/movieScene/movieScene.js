// pages/movie/movieScene/movieScene.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    time:{},
    movieId:3,
    timeList:[
      {
        id:'1',
        time:'4月10号',
      },
      {
        id: '2',
        time: '4月11号',
      },
      {
        id: '3',
        time: '4月12号',
      },
    ],
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
    movieSceneList:[
      {
        id:'33',
        startTime:'12:30',
        endTime:'14:30',
        movieType:'英语IMAX',
        roomType:'1号厅',
        price:'35.5',
      },
      {
        id: '34',
        startTime: '13:30',
        endTime: '15:30',
        movieType: '英语IMAX',
        roomType: '2号厅',
        price: '35.5',
      },
      {
        id: '35',
        startTime: '14:30',
        endTime: '16:30',
        movieType: '英语IMAX',
        roomType: '3号厅',
        price: '35.5',
      },
    ]
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
  selectMovie(e) {
    const movie = e.detail.movie
    let days = []
    // movie.shows.forEach(item => {
    //   days.push({
    //     title: item.dateShow,
    //     day: item.showDate
    //   })
    // })
    this.setData({
      movie,
      days,
      time:this.data.timeList[0]
      // timeList: this.createEndTime(movie.shows[0].plist, movie.dur)
    })
  },
  selectTime: function (e) {
    let index = e.currentTarget.dataset.index
    console.info(index)
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
  }
})