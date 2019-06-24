// component/cardPopup/cardPopup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    popupType: {
      type: String,
      value: false,
      observer: function (newVal, oldVal, changedPath) {


      }

    },
    cardPopupShow: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {


      }
    },
    cardList: {
      type: Array,
      value: ['1'],
      observer: function (newVal, oldVal, changedPath) {


      }
    }, 
    cinemaName: {
      type: String,
      value: '',
      observer: function (newVal, oldVal, changedPath) {


      }
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    cardListNo:0,
    cardPassword:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pushPassword: function () {
      let cardPassword = this.data.cardPassword
      if (!cardPassword && !this.properties.cardList[this.data.cardListNo].pin) {
        wx.showModal({
          title: '提示',
          content: '会员卡密码不能为空',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      } else {
        let cardList = this.properties.cardList
        let card = cardList[this.data.cardListNo]
        card.cardPassword = cardPassword
        this.triggerEvent('pushPassword', {
          card
        })

      }

    },
    noCardBuy: function () {
      this.closePopup()
      this.triggerEvent('noCardBuy', {
        
      })
    },
    closePopup: function () {
      this.triggerEvent('closePopup', {//执行父组件方法

      })
    },
    tabCard: function (e) {
      let val = e.detail.value
      let cardList = this.properties.cardList
      let card = cardList[val]
      this.setData({
        cardListNo: val,
      })
      

    },
    getPassword: function (e) {
      let password = e.detail.value;
      this.setData({
        cardPassword: password
      })
    }
  }
})
