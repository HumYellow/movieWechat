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
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    cardListNo:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    vipToBuy: function () {
      this.closePopup()
      let cardList = this.properties.cardList
      let card = cardList[this.data.cardListNo]
      this.triggerEvent('vipToBuy', {
        card
      })

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
  }
})
