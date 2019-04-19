// pages/order/orderList/orderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[
      {
        id:1,
        cinemaName:'电影院1',
        moviePic:'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp',
        movieName:'海王',
        num:2,
        time:'2019-8-13',
        seat:'vip厅8排13座，8排13座'
      },
      {
        id: 2,
        cinemaName: '电影院1',
        moviePic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp',
        movieName: '海王3',
        num: 2,
        time: '2019-7-13',
        seat: 'vip厅8排13座，8排13座'
      },
      {
        id: 3,
        cinemaName: '电影院1',
        moviePic: 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp',
        movieName: '海王4',
        num: 2,
        time: '2019-6-13',
        seat: 'vip厅8排13座，8排13座'
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
  toOrderDetail: function (e) {
    let id = e.currentTarget.dataset.id
    let url = '/pages/order/orderDetail/orderDetail?id=' + id
    wx.navigateTo({
      url: url
    })
  }
})