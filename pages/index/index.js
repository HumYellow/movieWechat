//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageType: 'index',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperList: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    movieListHot:[
      {
        'id':'1',
        'name':'海王',
        'url':'/pages/movie/movieList/movieList',
        'pic':'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
      },
      {
        'id': '2',
        'name': '海王',
        'url': '/pages/movie/movieList/movieList',
        'pic': 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
      },
      {
        'id': '3',
        'name': '海王',
        'url': '/pages/movie/movieList/movieList',
        'pic': 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
      },
      {
        'id': '4',
        'name': '海王',
        'url': '/pages/movie/movieList/movieList',
        'pic': 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
      },
      {
        'id': '5',
        'name': '海王',
        'url': '/pages/movie/movieList/movieList',
        'pic': 'https://img3.doubanio.com/view/photo/l/public/p2537122220.webp'
      },
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  toTabBar: function (e) {
    let url = e.currentTarget.dataset.url
    wx.switchTab({
      url: url
    })
  },
  toMovieDetails: function (e) {
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieDetails/movieDetails?id=" + movieId
    wx.navigateTo({
      url: url
    })
  },
  movieToCinema: function (e) {
    let movieId = e.currentTarget.dataset.id
    let url = "/pages/movie/movieToCinema/movieToCinema?id=" + movieId
    wx.navigateTo({
      url: url
    })
  },
})
