Component({
  properties: {
    movies: {
      type: Array,
      value: [],
      observer: function(movies) {
        if (Array.isArray(movies) && movies.length) {
          this.setData({
            movies
          }, () => {
            this.selectMovieClick()
          })
        }
      }
    },
    defaultSelectID: {
      type: String,
      value: '',
      observer: function (movie) {
        // movie && this.selectMovie()
      }
    }
  },
  data: {
    movies: [],
    movie: null, //选中的电影
    movieMask:'',
    movieMaskImg:'',
    movieMaskDelay:400,
    scrollListOver:false,
    scrollLeft: 1000, //设置滚动条位置
    size: 0, //bindselectMovie
    i: 0, //当前电影的索引,下面的函数传递了事件对象后就不能传递其他参数了，所以只能放在data中传递
    isTouch:false,
    isScroll:false,
    isClick:false,
    selectMovieClick:false
  },
  methods: {
    //选中电影
    selectMovieClick(e) {//click选择电影触发
      if (this.data.movie)this.movieMaskFlash(this.data.movie.img)
      let { movies } = this.data
      let movie = (e && e.currentTarget.dataset.movie) || movies.find(item => item.movieId == this.properties.defaultSelectID) || this.data.movies[this.data.i]
      let index = movies.findIndex(item => item.movieId === movie.movieId) || this.data.index
      this.setData({
        movie,
        isScroll: false,
        isClick:true
      }, () => {
        this.selectMovie(index)
      })
    },
    movieMaskFlash(img) {//切换电影时遮罩渐变
      let maskDelay = this.data.movieMaskDelay
      this.setData({
        movieMaskImg: img
      })
      var flash = wx.createAnimation({
        duration: maskDelay,
      })
      flash.opacity(0).step()
      this.setData({
        movieMask: flash.export()
      }, () => {
        setTimeout(() => {
          flash.opacity(1).step()
          this.setData({
            movieMaskImg: '',
            movieMask: flash.export()
          })
        }, maskDelay)
      })
    },
    selectMovie(index) {//选择电影方法，接收索引值触发滚动
      if (!this.data.scrollListOver) {
        if (this.data.size) {
          this.setData({
            scrollLeft: this.data.size * index
          })
        } else {
          this.calcSize().then((size) => {
            this.setData({
              size,
              scrollLeft: size * index
            })
          })
        }
      }
      //解除点击状态
      // clearTimeout(this.timeoutId);
      // this.timeoutId = setTimeout(function () {
      //   this.setData({
      //     isClick: false,
      //   })
      //   delete this.timeoutId;
      // }.bind(this), 300);

        this.setData({
          isClick: false,
        })
      let movie = this.data.movie
      this.triggerEvent('selectMovie', {//执行父组件方法
        movie
      })
    },
    //计算节点大小
    calcSize() {
      return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery().in(this)
        query.select(`#item1`).fields({
          size: true,
          computedStyle: ['margin-left']
        }, function(res) {
          let size = 0
          if (res) {
            size = res.width + parseFloat(res['margin-left'])
          }
          resolve(size)
        }).exec()
      })
    },
    handleTouchend(e) {//滑动结束选择电影触发
      this.setData({
          isTouch: false,
      })
      if (!this.data.isScroll || this.data.isClick) return
      if (this.data.movie) this.movieMaskFlash(this.data.movie.img)

      if (this.data.scrollListOver) {
        let index
        if (this.data.scrollListOver == 'right') {
          index = this.data.movies.length - 1
        } else {
          index = 0
        }
        this.bindMovie(index)
      } else {
        const size = this.data.size
        const query = wx.createSelectorQuery().in(this)
        query.select('#swiper-wrapper').scrollOffset((res) => {//计算选择的电影
          const scrollLeft = res.scrollLeft
          let index = Math.ceil(scrollLeft / size)
          if ((index * size - size / 2) < scrollLeft && (index * size + size / 2)) {
          } else {
            index--
          }
          this.bindMovie(index)
        }).exec()
      }
    },
    bindMovie: function (index) {
      this.setData({
        movie: this.data.movies[index],
      }, () => {
        let { movies } = this.data
        let movie = this.data.movie
        this.selectMovie(index)
      })

    },
    touchFn:function(){
      this.setData({
        isTouch: true,
        scrollListOver: false
      })
    },
    handleScroll(e) {//滑动电影触发 
      if (this.data.isScroll || this.data.isClick || !this.data.isTouch)return
      this.setData({
        isScroll: true,
      })
    },
    scrollToLeft: function () {
      console.info('left')
      this.setData({
        scrollListOver: 'left'
      })
    },
    scrollToRight: function () {
      console.info('right')
      this.setData({
        scrollListOver: 'right'
      })
    },
  }
})