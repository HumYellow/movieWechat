// component/popup/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    popupShow:{
      type: Boolean,
      value: false, 
      observer: function (newVal, oldVal, changedPath) {
        
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePopup: function () {
      this.triggerEvent('closePopup', {//执行父组件方法
        
      })
    }
  }
})
