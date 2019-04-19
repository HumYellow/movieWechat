// pages/movie/movieDetails/movieDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviePerformerList:[
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
    picList:[
      'https://img1.doubanio.com/view/photo/l/public/p2552111747.webp',
      'https://img1.doubanio.com/view/photo/l/public/p2552111748.webp',
      'https://img1.doubanio.com/view/photo/l/public/p2552111749.webp',
      'https://img1.doubanio.com/view/photo/l/public/p2552111750.webp',
      'https://img1.doubanio.com/view/photo/l/public/p2552111751.webp',

    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options)
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
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieToCinema/movieToCinema?id=" + movieId
    wx.navigateTo({
      url: url
    })
  },
  toVideo: function (e) {
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieVideo/movieVideo?id=" + movieId
    wx.navigateTo({
      url: url
    })

  }

})