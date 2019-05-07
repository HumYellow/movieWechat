// pages/cinema/cinemaList/cinemaList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageType: 'cinemaList',
    nowCity: '上海',
    region: ['广东省', '广州市', '海珠区'],
    index: 0,
    cinemaLine: ['全部院线', '院线1', '院线2', '院线3'],
    cityList: [{
      id: 0,
      name: '美国'
    },
    {
      id: 1,
      name: '中国'
    },
    {
      id: 2,
      name: '巴西'
    },
    {
      id: 3,
      name: '日本'
    }],
    cinemaList: [
      {
        id: "1",
        name: '影院1',
        price: '38.8',
        address: '外滩18号',
        pic: 'https://p1.meituan.net/deal/a63489de34a41fc04e01d1518df437ab58254.jpg@292w_292h_1e_1c',
      },
      {
        id: "2",
        name: '影院1',
        price: '38.8',
        address: '外滩18号',
        pic: 'https://p1.meituan.net/deal/a63489de34a41fc04e01d1518df437ab58254.jpg@292w_292h_1e_1c',
      },
      {
        id: "3",
        name: '影院1',
        price: '38.8',
        address: '外滩18号',
        pic: 'https://p1.meituan.net/deal/a63489de34a41fc04e01d1518df437ab58254.jpg@292w_292h_1e_1c',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  bindRegionChange: function (e) {
    console.info('picker发送选择改变，携带值为', e.detail.value)
  },
  bindRegionChangeLine: function (e) {
    console.info('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
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