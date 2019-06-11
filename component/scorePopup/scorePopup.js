// component/scorePopup/scorePopup.js
const app = getApp()
Component({
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行,
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    scorePopupShow: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {
        if (newVal) {
          this.getScore()
        }

      }
    },
    relatedId: {
      type: String,
      value: '',
      observer: function (newVal, oldVal, changedPath) {

      }
    },
    type: {
      type: String,
      value: 2,
      observer: function (newVal, oldVal, changedPath) {

      }
    },
    type: {
      type: String,
      value: 2,
      observer: function (newVal, oldVal, changedPath) {

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scoreNo:0,
    scoreList:{
      2:'极差',
      4:'较差',
      6:'一般',
      8:'不错',
      10:'很棒',
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scoreSelect: function (e) {
      let scoreNo = e.currentTarget.dataset.score
      this.setData({
        scoreNo:parseInt(scoreNo)
      })
    },
    pushScore: function () {
      let that = this
      let relatedId = this.properties.relatedId, url = "/home/score/saveData"
      let data = {
        type:this.properties.type,
        relatedId: relatedId,
        score: this.data.scoreNo
      }
      app.request('post', url, data, (res) => {
        that.closePopup()
      })
    },
    closePopup: function () {
      this.triggerEvent('closePopup', {//执行父组件方法

      })
    },
    getScore: function () {
      let type = 2, relatedId = this.properties.relatedId, url = '/home/score/detailData';
      let data = {
        type,
        relatedId: relatedId
      }
      app.request('get', url, data, (res) => {
        console.info(res.data.score)
        if (res.data.score) {
          this.setData({
            scoreNo:res.data.score
          })

        }
      })

    }
  }
})
