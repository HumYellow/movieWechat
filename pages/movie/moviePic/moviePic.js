// pages/movie/moviePic/moviePic.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId:null,
    picList: [],
    imgList:[],
    pageNo:1,
    number:30,
    lastPage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options)
    this.setData({
      movieId: options.movieId
    })
    this.getMoviePhoto()
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
    this.getMoviePhoto()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMoviePhoto: function () {
    wx.showLoading({
      title: '加载中'
    })
    let url = "/photo/listData";
    let data = {
      relatedId: this.data.movieId,
      type: 2,
      pageNo: this.data.pageNo,
      number: this.data.number
    }
    app.request('get', url, data, (res) => {
      let picList = res.data.photoVOList
      let imgListAll = this.data.imgList
      let imgList = []
      for (let i = 0; i < picList.length; i++) {
        imgList.push(picList[i].img)
      }
      imgListAll = imgListAll.concat(imgList)
      this.setData({
        picList,
        imgList: imgListAll
      })
      if (picList.length < this.data.number){
        this.setData({
          lastPage:true
        })
      } else {
        let pageNo = this.data.pageNo
        pageNo++
        this.setData({
          pageNo,
        })
        
      }
    })
  },
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var picList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: picList // 需要预览的图片http链接列表
    })
  },
})