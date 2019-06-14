// component/cardPopup/cardPopup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardPopupShow: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {


      }
    },
    cardList: {
      type: Array,
      value: [],
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
    cardPassword:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    vipToBuy: function () {
      let cardPassword = this.data.cardPassword
      if (cardPassword == '') {
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
        this.closePopup()
        let cardList = this.properties.cardList
        let card = cardList[this.data.cardListNo]
        card.cardPassword = cardPassword
        console.info(card)
        this.triggerEvent('vipToBuy', {
          card
        })

      }

    },
    toBuy: function () {
      this.closePopup()
      this.triggerEvent('toBuy', {
        
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
