const app = getApp()
const filter = require('./../../../static/js/filter');
Page({
  data: {
    mpiId:'',
    sceneDetail:{},
    selectSeatList: [],
    seatWidth: 24,
    seatPicWidth:null,
    scrollLeft:'',
    isShow:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let mpiId = options.mpiId
    this.setData({
      mpiId,
    })
    this.getScene(mpiId)
  },
  onShow:function(){
  },
  onReady:function(){
    
  },
  selectSeat: function (event) {//选择座位
    let selectSeatList = this.data.selectSeatList
    let status = event.currentTarget.dataset.status
    let seatLine = event.currentTarget.dataset.line
    let seatRank = event.currentTarget.dataset.rank
    if (status == 'N' || status == 'S') {//判断座位是否可选
      let seatList = this.data.sceneDetail.opiRoomSeat.opiLineSeatVOList
      for (let a = 0; a < seatList.length;a++){
        if (seatList[a].lineNo == seatLine) {//在列表中寻找此行
          var seatListLine = seatList[a].opiShowSeatVOList
          for (let i = 0; i < seatListLine.length; i++) {//根据选择座位获取座位真实号码
            if (seatRank == seatListLine[i].seatRank) {
              var setNum = {
                line: seatLine,
                rank: seatListLine[i].seatRank
              }
              if (seatListLine[i].status == 'S') {//状态为S时取消选座
                seatListLine[i].status = 'N'
                selectSeatList.removeArray(setNum);
              } else if (seatListLine[i].status == 'N') {//状态为N时选座
                if (this.seatLengthLimit()) {
                  seatListLine[i].status = 'S'
                  selectSeatList.push(setNum)
                }
              }
            }
          }
        }
      }
      this.setData({
        'sceneDetail.opiRoomSeat.opiLineSeatVOList': seatList,
        'selectSeatList': selectSeatList
      })
    }
  },
  deleteSeat: function (event) {//点击票券删除座位
    let seatLine = event.currentTarget.dataset.line
    let seatRank = event.currentTarget.dataset.rank
    let seatList = this.data.sceneDetail.opiRoomSeat.opiLineSeatVOList
    let selectSeatList = this.data.selectSeatList
    for (let a = 0; a < seatList.length; a++) {
      if (seatList[a].lineNo == seatLine) {//在列表中寻找此行
        var seatListLine = seatList[a].opiShowSeatVOList
        let setNum = {
          line: seatLine,
          rank: seatRank
        }
        for (let i = 0; i < seatListLine.length; i++) {
          if (seatListLine[i].seatRank == seatRank) {
            seatListLine[i].status = 'N'
            selectSeatList.removeArray(setNum);
          }
        }
      }
    }
    this.setData({
      'sceneDetail.opiRoomSeat.opiLineSeatVOList': seatList,
      'selectSeatList': selectSeatList
    })
  },
  seatLengthLimit:function(){//选座时检验是否达到上限
    let buyLimit = this.data.sceneDetail.opiDetailInfo.buyLimit
    let maxLength = buyLimit[buyLimit.length-1]
    let selectSeatList = this.data.selectSeatList
    if (selectSeatList.length >= maxLength) {
      wx.showModal({
        title: '提示',
        content: '此场次最多只能选择' + maxLength +'个座位',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false
    }else{
      return true
    }
  },
  toBuy: function () {//提交场次座位获取订单号
    let buyLimit = this.data.sceneDetail.opiDetailInfo.buyLimit
    let selectSeatList = this.data.selectSeatList
    //buyLimit = [1, 3, 4]
    if (buyLimit.indexOf(selectSeatList.length) > -1) {//检验选票数量是否符合规则
      wx.showLoading({
        title: '正在锁座'
      })
      let url = '/order/createData';
      let seatLabel = '';
      for (let i = 0; i < selectSeatList.length; i++) {
        seatLabel += selectSeatList[i].line + ':' + selectSeatList[i].rank + ','
      }
      let data = {
        mpiId: this.data.mpiId,
        seatLabel: seatLabel.substring(0, seatLabel.length - 1),
        quantity:selectSeatList.length
      }
      app.request('post', url, data, (res) => {//获取订单ID
        this.toOrder(res.data.orderId)
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '此场次不能购买' + selectSeatList.length + '张票',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },
  toOrder: function (orderId){//跳转订单确认页
    let url = "/pages/order/confirmOrder/confirmOrder?orderId=" + orderId
    wx.navigateTo({
      url: url
    })
  },
  getScene: function (mpiId) {//获取场次信息
    let url = "/order/chooseSeatData"
    let data = {
      mpiId: mpiId
    }
    app.request('get', url, data, (res) => {
      console.info(res.data)
      this.setData({
        sceneDetail: res.data
      },()=> {
        this.getSceneWidth()
        wx.setNavigationBarTitle({//修改title
          title: res.data.opiDetailInfo.movieName,
        })
      })
    })
  },
  getSceneWidth:function(e){//获取座位图宽度
    let seatPicWidth = this.data.sceneDetail.opiRoomSeat.rankNum * this.data.seatWidth
    this.setData({
      seatPicWidth,
      isShow: true
    })
    this.setSceneCenter()
  },
  setSceneCenter: function (e) {//座位图居中
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('#seatPic').boundingClientRect(function (rect) {
      let widthBox = rect.width
      let scrollLeft = (that.data.seatPicWidth - widthBox) / 2
      that.setData({
        scrollLeft,
      })
    }).exec();
  }
})