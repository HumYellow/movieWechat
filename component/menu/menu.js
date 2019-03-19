// component/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageType:{
      type:String,
      value:'index'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indexMenuList:[{
      linkType:'index',
      linkName:'首页',
      url:'/pages/index/index'
    }, {
      linkType: 'movieList',
      linkName: '电影',
      url: '/pages/movie/movieList/movieList'
    }, {
      linkType: 'cinemaList',
      linkName: '影院',
      url: '/pages/cinema/cinemaList/cinemaList'
    }, {
      linkType: 'myCenter',
      linkName: '我的',
      url: '/pages/index/index'
    },]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
