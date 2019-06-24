// component/couponPopup/couponPopup.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponPopupShow: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {
        if (newVal == true){
          this.setData({
            couponList: {},
          })
          this.getCouponList()
        }
      }
    },
    orderId: {
      type: String,
      value: false,
      observer: function (newVal, oldVal, changedPath) {

      }
    },

  },
  lifetimes:{//生命周期
    created:function(){
      
    }

  },
  /**
   * 组件的初始数据
   */
  data: {
    couponList:{},
    bindCoupon:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePopup: function () {
      this.triggerEvent('closePopup', {//执行父组件方法

      })
    },
    bindCouponInput: function (e) {
      this.setData({
        bindCoupon: e.detail.value
      })
      //console.info(this.data.bindCoupon)
    },
    pushCouponCode: function () {
      let _that = this
      let bindCoupon = this.data.bindCoupon
      if (!this.data.bindCoupon) {
        wx.showModal({
          title: '提示',
          content: '请输入票券号码',
          showCancel: false,
          success: function (res) {
          }
        })
        return
      }
      //在订单页先绑定再使用
      let url = '/order/discount/useElecCoupon';
      let data = {
        couponPass: bindCoupon,
        orderId: this.properties.orderId,
      }
      app.request('post', url, data, (res) => {
        wx.showToast({
          title: '绑定成功',
          icon: 'succes',
          duration: 3000,
          mask: true,
          success: function () {
            _that.setData({
              bindCoupon:''
            })
            _that.selectCouponCallback()
          }
        })

      })
    },
    selectCoupon:function(e){
      let _that = this
      let couponId = e.currentTarget.dataset.id
      let url = '/order/discount/useElecCoupon'
      let data = {
        orderId: this.properties.orderId,
        couponId,
        couponPass: this.data.bindCoupon
      }
      app.request('post', url, data, (res) => {
        _that.selectCouponCallback()
      })
    },
    delectCoupon:function(){
      let _that = this
      let url = '/order/discount/unuseElecCoupon'
      let data = {
        orderId: this.properties.orderId
      }
      app.request('post', url, data, (res) => {
        _that.selectCouponCallback()
      })
    },
    selectCouponCallback: function () {
      this.triggerEvent('selectCouponCallback', {//执行父组件方法

      })

    },
    getCouponList: function () {
      let _that = this
      let url = '/order/discount/elecCouponListData'
      let data = {
        orderId: this.properties.orderId,
      }
      app.request('get', url, data, (res) => {
        let couponList = res.data.couponVOList
        this.setData({
          couponList:res.data.couponVOList,
        })
      })

    }

  }
})
