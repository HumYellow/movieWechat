//app.js
const util = require('/utils/util.js')
const md5 = require('/utils/md5.js')
const request = require('/utils/request.js')
const QRCode = require('/utils/qrcode.js')
const MidasPayApi = require('/midaspay/api/enterprisePay.js');
App({
  onLaunch: function (e) {//e.query为接受参数
    console.info(e.query)
    //this.setCityStorage('', e.query)
    let that = this
    this.getCityCode(this.globalData.defaultCity)//存默认城市
    this.locationCheck()
  }, 
  globalData: {
    userInfo: null,
    locationData: '', 
    cityCode:'',
    defaultCity:'上海'
  },
  removeArray :function (arr, _obj) {//删除数组中某个对象
    var length = arr.length;
    for (var i = 0; i < length; i++) {
      if (this.isObjectValueEqual(arr[i], _obj)) {
        if (i == 0) {
          arr.shift(); //删除并返回数组的第一个元素
          return arr;
        }
        else if (i == length - 1) {
          arr.pop();  //删除并返回数组的最后一个元素
          return arr;
        }
        else {
          arr.splice(i, 1); //删除下标为i的元素
          return arr;
        }
      }
    }
  },
  isObjectValueEqual:  function(a, b) {//比对两个数组
      //取对象a和b的属性名
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);
      //判断属性名的length是否一致
      if(aProps.length != bProps.length) {
        return false;
      }
      //循环取出属性名，再判断属性值是否一致
      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      return true;
  },
  request: function (method, url, data, callback, errFun) {//整合请求接口
    request.wxRequest(method, url, data, callback, errFun)
  },
  thisLoad:function(){//刷新当前页面
    const pages = getCurrentPages()
    const perpage = pages[pages.length - 1]
    perpage.onLoad() 
  },
  checkSession: function () {
    let that = this
    //---------登录有效期检查
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        that.wxLogin() //重新登录
      }
    });
  },
  wxLogin: function (fn) {//微信登录获取用户凭证
    let that = this
    wx.login({
      success: (r) => {
        var code = r.code;//登录凭证
        if (code) {
            wx.getSetting({//获取用户当前权限设置
              success(res) {
                if (res.authSetting['scope.userInfo']){//如果用户授予了权限
                  wx.getUserInfo({//调用获取用户信息接口
                    success: (res) => {
                      var data = {
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        code: code
                      }
                      that.request('POST', '/login/decodeUserInfo', data, (res) => {
                        let code = res.data.MemberEncode
                        let phone = res.data.phone
                        wx.setStorageSync('MemberEncode', code)
                        if (phone) {
                          let page = getCurrentPages()//获取栈
                          if (page.length <= 1) {//无后退按钮
                            that.toTabBar('/pages/index/index')
                          }else{
                            wx.navigateBack()
                          }
                        } else {
                          wx.redirectTo({
                            url: "/pages/login/bindPhone/bindPhone"
                          });
                        }
                      }, (err) => {
                        console.log(err)
                      })
                    },
                    fail: function (err) {
                      console.info('获取用户信息失败'+err)
                    }
                  })
                } else {//如果用户没有授权
                  wx.showModal({
                    title: '提示',
                    content: '请您授权，否则无法完成购票',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      }
                    }
                  })
                }
              }
            })
        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('微信登陆失败')
      }
    });
  },
  checkWxLogin:function(){//检查登陆
    let data = '';
    this.request('get', '/login/info', data, (res) => {
      if (!res.data.nickName) {
        //跳转到登录页
        wx.navigateTo({
          url: "/pages/login/login/login"
        });
      }
    }, (err) => {
      console.log(err)
    })
  },
  outWxLogin:function(){//退出登陆
    let data = '';
    this.request('get', '/login/info', data, (res) => {
      if (!res.data.nickName) {
        //跳转到登录页
        wx.navigateTo({
          url: "/pages/login/login/login"
        });
      }
    }, (err) => {
      console.log(err)
    })
  },
  md5:function(data){//MD5加密
    return md5.md5(data)
  },
  requestPay:function(){//支付接口
    wx.requestPayment({
      timeStamp: new Date(),
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) {
        
      },
      fail(res) {
        
      }
    })
  },
  toTabBar: function (url) {//主页面跳转
    wx.switchTab({
      url: url,
      success: function(){
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onPullDownRefresh();
      }
    })
  },
  locationCheck: function () {//校验用户定位权限
    let that = this
    wx.getSetting({//检查用户授予权限
      success: function (res) {
        if (!res.authSetting) {//如果请求过用户权限
          if (res.authSetting['scope.userLocation']) {//如果有权限直接获取经纬度
            that.getLocation()
          } else {//如果没有权限直接让用户设置
            wx.showModal({
              title: '提示',
              content: '请授权位置信息，点击确定去授权',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success(res) {
                      console.log(res.authSetting)
                      // res.authSetting = {
                      //   "scope.userInfo": true,
                      //   "scope.userLocation": true
                      // }
                    }
                  })
                }
              }
            })
          }
        } else {//没请求过则直接请求弹窗权限
            that.getLocation()
        }
      }
    })
  },
  getLocation: function () {//获取用户定位
    var page = this
    wx.getLocation({
      type: 'gcj02',   //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function (res) {
        // success  
        var latitude = res.latitude
        var longitude = res.longitude
        page.loadCity(longitude, latitude)
      },
      fail: function () {//如果不授权，直接设置默认城市

      },
    })
  },
  loadCity: function (longitude, latitude) {//用经纬度去请求百度地图获取城市名
    var page = this
    var baiduAK = 'BGBFcP7Cs2Ip0Fy2WSAnAObSOIB3UdCd'
    let url = 'https://api.map.baidu.com/geocoder/v2/?ak=' + baiduAK + '&location=' + latitude + ',' + longitude + '&output=json'
    wx.request({
      url: url ,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.info(res.data)
        // success  
        var city = res.data.result.addressComponent.city;
        page.getCityCode(city)
        //page.setData({ currentCity: city });
      },
      fail: function () {

      },
    })
  },
  getCityCode: function (city) {//用城市名请求cityCode
    let that = this
    let url = '/openCity/searchCityCodeData'
    let data = {
      cityName: city
    }
    this.request('post', url, data, (res) => {
      let cityCode = res.data.cityCode
      let cityName = res.data.cityBriefName
      that.setCityStorage(cityName, cityCode)
    })
  },
  setCityStorage: function (cityName, cityCode) {//储存城市和cityCode
    wx.setStorageSync('cityCode', cityCode)
    wx.setStorageSync('cityNow', cityName)
  },
  getQRCode: function (code, colorDark) {
    let qrcode = new QRCode('canvas', {
      text: code,
      width: 150,
      height: 150,
      colorDark: colorDark ? colorDark:'#6ab778',
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    //qrcode.makeCode('aabbcc') 手动添加字符串
  },

  _pay(p,callback) {
    let _that = this
    if (!this.payInstance) {
      this.payInstance = MidasPayApi.init({
        env: p.sandbox, // 0或不传是正式，1是沙箱
        autoDestroy: true
      });
    }
    const params = {
      openid: p.openId, //'oMYJr5Y5C0KmlAoXSHd1MpLo2ZCc',
      offer_id: p.offerId,
      pf: 'html5',
      goodstokenurl: p.urlParams,
      zoneid: '1'
    };
    console.info(params)
    this.payInstance.launchPay(params, (result) => {
      console.info(result)
      if (result.resultCode === 0) {
        wx.showLoading({
          title: '支付成功，出票中'
        })
        let url = '/wechatPay/queryOrder';
        let data = {
          orderId: p.orderId,
        }
        _that.request('get', url, data, (res) => {
          if (callback) callback()
        })
      } else/* if (result.resultCode = -2)*/ {
        // 取消支付
        wx.showToast({
          title: result.resultMsg || '支付异常:${result.resultCode}',
          icon: 'none',
          mask: true
        });
      }
      this.payInstance = null;
    });
  },
  toSelfPage:function(url){
    console.info(url)
    let pageType = url.split('?')[0]
    let dataStr = url.split('?')[1];
    let link
    if (pageType == 'movie') {
      link = '/pages/movie/movieDetails/movieDetails'
    } else if (pageType == 'cinema') {
      link = '/pages/movie/movieScene/movieScene'
    } else {
      link = '/pages/index/index'
    }
    link = link + '?' + dataStr
    wx.navigateTo({
      url: link
    })
  },
  linkToWap:function(url){//跳转H5页面，传链接
    wx.navigateTo({
      url: '/pages/wapLink/wapLink?url='+ url,
      success: function (e) {
        console.log(e);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  toOther:function(appId,url){//跳转其他小程序
    wx.navigateToMiniProgram({
      appId: appId, // 要跳转的小程序的appid
      path: url, // 跳转的目标页面
      extarData: {
        open: 'auth'
      },
      success(res) {
        // 打开成功  
      }
    })
  }
})