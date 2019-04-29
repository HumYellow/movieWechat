const app = getApp()
const filter = require('./../../../static/js/filter');
Page({
  data: {
    seatList: {
      "rownum": 10,
      "columnnum": 25,
      "seatList": [{ "columnId": "0", "id": "2046", "rowId": "1", "status": "E" }, { "columnId": "0", "id": "2047", "rowId": "1", "status": "E" }, { "columnId": "0", "id": "2048", "rowId": "1", "status": "E" }, { "columnId": "0", "id": "2049", "rowId": "1", "status": "E" }, { "columnId": "0", "id": "2050", "rowId": "1", "status": "E" }, { "columnId": "1", "id": "2051", "rowId": "1", "status": "N" }, { "columnId": "2", "id": "2052", "rowId": "1", "status": "N" }, { "columnId": "3", "id": "2053", "rowId": "1", "status": "N" }, { "columnId": "4", "id": "2054", "rowId": "1", "status": "N" }, { "columnId": "5", "id": "2055", "rowId": "1", "status": "N" }, { "columnId": "6", "id": "2056", "rowId": "1", "status": "N" }, { "columnId": "7", "id": "2057", "rowId": "1", "status": "N" }, { "columnId": "8", "id": "2058", "rowId": "1", "status": "N" }, { "columnId": "9", "id": "2059", "rowId": "1", "status": "N" }, { "columnId": "10", "id": "2060", "rowId": "1", "status": "N" }, { "columnId": "11", "id": "2061", "rowId": "1", "status": "N" }, { "columnId": "12", "id": "2062", "rowId": "1", "status": "N" }, { "columnId": "13", "id": "2063", "rowId": "1", "status": "N" }, { "columnId": "14", "id": "2064", "rowId": "1", "status": "N" }, { "columnId": "15", "id": "2065", "rowId": "1", "status": "N" }, { "columnId": "16", "id": "2066", "rowId": "1", "status": "N" }, { "columnId": "17", "id": "2067", "rowId": "1", "status": "N" }, { "columnId": "18", "id": "2068", "rowId": "1", "status": "N" }, { "columnId": "0", "id": "2069", "rowId": "1", "status": "E" }, { "columnId": "0", "id": "2070", "rowId": "1", "status": "E" }, { "columnId": "0", "id": "2071", "rowId": "2", "status": "E" }, { "columnId": "0", "id": "2072", "rowId": "2", "status": "E" }, { "columnId": "0", "id": "2073", "rowId": "2", "status": "E" }, { "columnId": "0", "id": "2074", "rowId": "2", "status": "E" }, { "columnId": "0", "id": "2075", "rowId": "2", "status": "E" }, { "columnId": "1", "id": "2076", "rowId": "2", "status": "N" }, { "columnId": "2", "id": "2077", "rowId": "2", "status": "N" }, { "columnId": "3", "id": "2078", "rowId": "2", "status": "N" }, { "columnId": "4", "id": "2079", "rowId": "2", "status": "N" }, { "columnId": "5", "id": "2080", "rowId": "2", "status": "N" }, { "columnId": "6", "id": "2081", "rowId": "2", "status": "N" }, { "columnId": "7", "id": "2082", "rowId": "2", "status": "N" }, { "columnId": "8", "id": "2083", "rowId": "2", "status": "N" }, { "columnId": "9", "id": "2084", "rowId": "2", "status": "N" }, { "columnId": "10", "id": "2085", "rowId": "2", "status": "N" }, { "columnId": "11", "id": "2086", "rowId": "2", "status": "N" }, { "columnId": "12", "id": "2087", "rowId": "2", "status": "N" }, { "columnId": "13", "id": "2088", "rowId": "2", "status": "N" }, { "columnId": "14", "id": "2089", "rowId": "2", "status": "N" }, { "columnId": "15", "id": "2090", "rowId": "2", "status": "N" }, { "columnId": "16", "id": "2091", "rowId": "2", "status": "N" }, { "columnId": "17", "id": "2092", "rowId": "2", "status": "N" }, { "columnId": "18", "id": "2093", "rowId": "2", "status": "N" }, { "columnId": "0", "id": "2094", "rowId": "2", "status": "E" }, { "columnId": "0", "id": "2095", "rowId": "2", "status": "E" }, { "columnId": "0", "id": "2096", "rowId": "3", "status": "E" }, { "columnId": "0", "id": "2097", "rowId": "3", "status": "E" }, { "columnId": "0", "id": "2098", "rowId": "3", "status": "E" }, { "columnId": "0", "id": "2099", "rowId": "3", "status": "E" }, { "columnId": "0", "id": "2100", "rowId": "3", "status": "E" }, { "columnId": "1", "id": "2101", "rowId": "3", "status": "N" }, { "columnId": "2", "id": "2102", "rowId": "3", "status": "N" }, { "columnId": "3", "id": "2103", "rowId": "3", "status": "N" }, { "columnId": "4", "id": "2104", "rowId": "3", "status": "N" }, { "columnId": "5", "id": "2105", "rowId": "3", "status": "N" }, { "columnId": "6", "id": "2106", "rowId": "3", "status": "N" }, { "columnId": "7", "id": "2107", "rowId": "3", "status": "N" }, { "columnId": "8", "id": "2108", "rowId": "3", "status": "N" }, { "columnId": "9", "id": "2109", "rowId": "3", "status": "N" }, { "columnId": "10", "id": "2110", "rowId": "3", "status": "N" }, { "columnId": "11", "id": "2111", "rowId": "3", "status": "N" }, { "columnId": "12", "id": "2112", "rowId": "3", "status": "N" }, { "columnId": "13", "id": "2113", "rowId": "3", "status": "N" }, { "columnId": "14", "id": "2114", "rowId": "3", "status": "N" }, { "columnId": "15", "id": "2115", "rowId": "3", "status": "N" }, { "columnId": "16", "id": "2116", "rowId": "3", "status": "N" }, { "columnId": "17", "id": "2117", "rowId": "3", "status": "N" }, { "columnId": "18", "id": "2118", "rowId": "3", "status": "N" }, { "columnId": "0", "id": "2119", "rowId": "3", "status": "E" }, { "columnId": "0", "id": "2120", "rowId": "3", "status": "E" }, { "columnId": "0", "id": "2121", "rowId": "4", "status": "E" }, { "columnId": "0", "id": "2122", "rowId": "4", "status": "E" }, { "columnId": "0", "id": "2123", "rowId": "4", "status": "E" }, { "columnId": "0", "id": "2124", "rowId": "4", "status": "E" }, { "columnId": "0", "id": "2125", "rowId": "4", "status": "E" }, { "columnId": "1", "id": "2126", "rowId": "4", "status": "N" }, { "columnId": "2", "id": "2127", "rowId": "4", "status": "N" }, { "columnId": "3", "id": "2128", "rowId": "4", "status": "N" }, { "columnId": "4", "id": "2129", "rowId": "4", "status": "N" }, { "columnId": "5", "id": "2130", "rowId": "4", "status": "N" }, { "columnId": "6", "id": "2131", "rowId": "4", "status": "N" }, { "columnId": "7", "id": "2132", "rowId": "4", "status": "N" }, { "columnId": "8", "id": "2133", "rowId": "4", "status": "N" }, { "columnId": "9", "id": "2134", "rowId": "4", "status": "N" }, { "columnId": "10", "id": "2135", "rowId": "4", "status": "N" }, { "columnId": "11", "id": "2136", "rowId": "4", "status": "N" }, { "columnId": "12", "id": "2137", "rowId": "4", "status": "N" }, { "columnId": "13", "id": "2138", "rowId": "4", "status": "N" }, { "columnId": "14", "id": "2139", "rowId": "4", "status": "N" }, { "columnId": "15", "id": "2140", "rowId": "4", "status": "N" }, { "columnId": "16", "id": "2141", "rowId": "4", "status": "N" }, { "columnId": "17", "id": "2142", "rowId": "4", "status": "N" }, { "columnId": "18", "id": "2143", "rowId": "4", "status": "N" }, { "columnId": "0", "id": "2144", "rowId": "4", "status": "E" }, { "columnId": "0", "id": "2145", "rowId": "4", "status": "E" }, { "columnId": "0", "id": "2146", "rowId": "5", "status": "E" }, { "columnId": "0", "id": "2147", "rowId": "5", "status": "E" }, { "columnId": "0", "id": "2148", "rowId": "5", "status": "E" }, { "columnId": "0", "id": "2149", "rowId": "5", "status": "E" }, { "columnId": "0", "id": "2150", "rowId": "5", "status": "E" }, { "columnId": "1", "id": "2151", "rowId": "5", "status": "N" }, { "columnId": "2", "id": "2152", "rowId": "5", "status": "N" }, { "columnId": "3", "id": "2153", "rowId": "5", "status": "N" }, { "columnId": "4", "id": "2154", "rowId": "5", "status": "N" }, { "columnId": "5", "id": "2155", "rowId": "5", "status": "N" }, { "columnId": "6", "id": "2156", "rowId": "5", "status": "N" }, { "columnId": "7", "id": "2157", "rowId": "5", "status": "N" }, { "columnId": "8", "id": "2158", "rowId": "5", "status": "N" }, { "columnId": "9", "id": "2159", "rowId": "5", "status": "N" }, { "columnId": "10", "id": "2160", "rowId": "5", "status": "N" }, { "columnId": "11", "id": "2161", "rowId": "5", "status": "N" }, { "columnId": "12", "id": "2162", "rowId": "5", "status": "N" }, { "columnId": "13", "id": "2163", "rowId": "5", "status": "N" }, { "columnId": "14", "id": "2164", "rowId": "5", "status": "N" }, { "columnId": "15", "id": "2165", "rowId": "5", "status": "N" }, { "columnId": "16", "id": "2166", "rowId": "5", "status": "N" }, { "columnId": "17", "id": "2167", "rowId": "5", "status": "N" }, { "columnId": "18", "id": "2168", "rowId": "5", "status": "N" }, { "columnId": "0", "id": "2169", "rowId": "5", "status": "E" }, { "columnId": "0", "id": "2170", "rowId": "5", "status": "E" }, { "columnId": "0", "id": "2171", "rowId": "6", "status": "E" }, { "columnId": "0", "id": "2172", "rowId": "6", "status": "E" }, { "columnId": "0", "id": "2173", "rowId": "6", "status": "E" }, { "columnId": "0", "id": "2174", "rowId": "6", "status": "E" }, { "columnId": "0", "id": "2175", "rowId": "6", "status": "E" }, { "columnId": "1", "id": "2176", "rowId": "6", "status": "N" }, { "columnId": "2", "id": "2177", "rowId": "6", "status": "N" }, { "columnId": "3", "id": "2178", "rowId": "6", "status": "N" }, { "columnId": "4", "id": "2179", "rowId": "6", "status": "N" }, { "columnId": "5", "id": "2180", "rowId": "6", "status": "N" }, { "columnId": "6", "id": "2181", "rowId": "6", "status": "N" }, { "columnId": "7", "id": "2182", "rowId": "6", "status": "N" }, { "columnId": "8", "id": "2183", "rowId": "6", "status": "L" }, { "columnId": "9", "id": "2184", "rowId": "6", "status": "L" }, { "columnId": "10", "id": "2185", "rowId": "6", "status": "N" }, { "columnId": "11", "id": "2186", "rowId": "6", "status": "N" }, { "columnId": "12", "id": "2187", "rowId": "6", "status": "N" }, { "columnId": "13", "id": "2188", "rowId": "6", "status": "N" }, { "columnId": "14", "id": "2189", "rowId": "6", "status": "N" }, { "columnId": "15", "id": "2190", "rowId": "6", "status": "N" }, { "columnId": "16", "id": "2191", "rowId": "6", "status": "N" }, { "columnId": "17", "id": "2192", "rowId": "6", "status": "N" }, { "columnId": "18", "id": "2193", "rowId": "6", "status": "N" }, { "columnId": "0", "id": "2194", "rowId": "6", "status": "E" }, { "columnId": "0", "id": "2195", "rowId": "6", "status": "E" }, { "columnId": "0", "id": "2196", "rowId": "7", "status": "E" }, { "columnId": "0", "id": "2197", "rowId": "7", "status": "E" }, { "columnId": "0", "id": "2198", "rowId": "7", "status": "E" }, { "columnId": "0", "id": "2199", "rowId": "7", "status": "E" }, { "columnId": "0", "id": "2200", "rowId": "7", "status": "E" }, { "columnId": "1", "id": "2201", "rowId": "7", "status": "N" }, { "columnId": "2", "id": "2202", "rowId": "7", "status": "N" }, { "columnId": "3", "id": "2203", "rowId": "7", "status": "N" }, { "columnId": "4", "id": "2204", "rowId": "7", "status": "N" }, { "columnId": "5", "id": "2205", "rowId": "7", "status": "N" }, { "columnId": "6", "id": "2206", "rowId": "7", "status": "N" }, { "columnId": "7", "id": "2207", "rowId": "7", "status": "N" }, { "columnId": "8", "id": "2208", "rowId": "7", "status": "N" }, { "columnId": "9", "id": "2209", "rowId": "7", "status": "N" }, { "columnId": "10", "id": "2210", "rowId": "7", "status": "N" }, { "columnId": "11", "id": "2211", "rowId": "7", "status": "N" }, { "columnId": "12", "id": "2212", "rowId": "7", "status": "N" }, { "columnId": "13", "id": "2213", "rowId": "7", "status": "N" }, { "columnId": "14", "id": "2214", "rowId": "7", "status": "N" }, { "columnId": "15", "id": "2215", "rowId": "7", "status": "N" }, { "columnId": "16", "id": "2216", "rowId": "7", "status": "N" }, { "columnId": "17", "id": "2217", "rowId": "7", "status": "N" }, { "columnId": "18", "id": "2218", "rowId": "7", "status": "N" }, { "columnId": "0", "id": "2219", "rowId": "7", "status": "E" }, { "columnId": "0", "id": "2220", "rowId": "7", "status": "E" }, { "columnId": "0", "id": "2221", "rowId": "8", "status": "E" }, { "columnId": "0", "id": "2222", "rowId": "8", "status": "E" }, { "columnId": "0", "id": "2223", "rowId": "8", "status": "E" }, { "columnId": "0", "id": "2224", "rowId": "8", "status": "E" }, { "columnId": "0", "id": "2225", "rowId": "8", "status": "E" }, { "columnId": "1", "id": "2226", "rowId": "8", "status": "N" }, { "columnId": "2", "id": "2227", "rowId": "8", "status": "N" }, { "columnId": "3", "id": "2228", "rowId": "8", "status": "N" }, { "columnId": "4", "id": "2229", "rowId": "8", "status": "N" }, { "columnId": "5", "id": "2230", "rowId": "8", "status": "N" }, { "columnId": "6", "id": "2231", "rowId": "8", "status": "N" }, { "columnId": "7", "id": "2232", "rowId": "8", "status": "N" }, { "columnId": "8", "id": "2233", "rowId": "8", "status": "N" }, { "columnId": "9", "id": "2234", "rowId": "8", "status": "N" }, { "columnId": "10", "id": "2235", "rowId": "8", "status": "N" }, { "columnId": "11", "id": "2236", "rowId": "8", "status": "N" }, { "columnId": "12", "id": "2237", "rowId": "8", "status": "N" }, { "columnId": "13", "id": "2238", "rowId": "8", "status": "N" }, { "columnId": "14", "id": "2239", "rowId": "8", "status": "N" }, { "columnId": "15", "id": "2240", "rowId": "8", "status": "N" }, { "columnId": "16", "id": "2241", "rowId": "8", "status": "N" }, { "columnId": "17", "id": "2242", "rowId": "8", "status": "N" }, { "columnId": "18", "id": "2243", "rowId": "8", "status": "N" }, { "columnId": "0", "id": "2244", "rowId": "8", "status": "E" }, { "columnId": "0", "id": "2245", "rowId": "8", "status": "E" }, { "columnId": "1", "id": "2246", "rowId": "9", "status": "N" }, { "columnId": "2", "id": "2247", "rowId": "9", "status": "N" }, { "columnId": "0", "id": "2248", "rowId": "9", "status": "E" }, { "columnId": "0", "id": "2249", "rowId": "9", "status": "E" }, { "columnId": "0", "id": "2250", "rowId": "9", "status": "E" }, { "columnId": "3", "id": "2251", "rowId": "9", "status": "N" }, { "columnId": "4", "id": "2252", "rowId": "9", "status": "N" }, { "columnId": "5", "id": "2253", "rowId": "9", "status": "N" }, { "columnId": "6", "id": "2254", "rowId": "9", "status": "N" }, { "columnId": "7", "id": "2255", "rowId": "9", "status": "N" }, { "columnId": "8", "id": "2256", "rowId": "9", "status": "N" }, { "columnId": "9", "id": "2257", "rowId": "9", "status": "N" }, { "columnId": "10", "id": "2258", "rowId": "9", "status": "N" }, { "columnId": "11", "id": "2259", "rowId": "9", "status": "N" }, { "columnId": "12", "id": "2260", "rowId": "9", "status": "N" }, { "columnId": "13", "id": "2261", "rowId": "9", "status": "N" }, { "columnId": "14", "id": "2262", "rowId": "9", "status": "N" }, { "columnId": "15", "id": "2263", "rowId": "9", "status": "N" }, { "columnId": "16", "id": "2264", "rowId": "9", "status": "N" }, { "columnId": "17", "id": "2265", "rowId": "9", "status": "N" }, { "columnId": "18", "id": "2266", "rowId": "9", "status": "N" }, { "columnId": "19", "id": "2267", "rowId": "9", "status": "N" }, { "columnId": "20", "id": "2268", "rowId": "9", "status": "N" }, { "columnId": "0", "id": "2269", "rowId": "9", "status": "E" }, { "columnId": "0", "id": "2270", "rowId": "9", "status": "E" }, { "columnId": "1", "id": "2271", "rowId": "10", "status": "N" }, { "columnId": "2", "id": "2272", "rowId": "10", "status": "N" }, { "columnId": "3", "id": "2273", "rowId": "10", "status": "N" }, { "columnId": "4", "id": "2274", "rowId": "10", "status": "N" }, { "columnId": "5", "id": "2275", "rowId": "10", "status": "N" }, { "columnId": "6", "id": "2276", "rowId": "10", "status": "N" }, { "columnId": "7", "id": "2277", "rowId": "10", "status": "N" }, { "columnId": "8", "id": "2278", "rowId": "10", "status": "N" }, { "columnId": "9", "id": "2279", "rowId": "10", "status": "N" }, { "columnId": "10", "id": "2280", "rowId": "10", "status": "N" }, { "columnId": "11", "id": "2281", "rowId": "10", "status": "N" }, { "columnId": "12", "id": "2282", "rowId": "10", "status": "N" }, { "columnId": "13", "id": "2283", "rowId": "10", "status": "N" }, { "columnId": "14", "id": "2284", "rowId": "10", "status": "N" }, { "columnId": "15", "id": "2285", "rowId": "10", "status": "N" }, { "columnId": "16", "id": "2286", "rowId": "10", "status": "N" }, { "columnId": "17", "id": "2287", "rowId": "10", "status": "N" }, { "columnId": "18", "id": "2288", "rowId": "10", "status": "N" }, { "columnId": "19", "id": "2289", "rowId": "10", "status": "N" }, { "columnId": "20", "id": "2290", "rowId": "10", "status": "N" }, { "columnId": "21", "id": "2291", "rowId": "10", "status": "N" }, { "columnId": "22", "id": "2292", "rowId": "10", "status": "N" }, { "columnId": "23", "id": "2293", "rowId": "10", "status": "N" }, { "columnId": "24", "id": "2294", "rowId": "10", "status": "N" }, { "columnId": "25", "id": "2295", "rowId": "10", "status": "N" }], "midline": "12.5"
    },
  },
  selectSeatList: [],
  selectSeatNum: 0,
  selectSeat: function (event) {
    let selectSeatList = this.selectSeatList
    let id = event.currentTarget.id
    let status = event.currentTarget.dataset.status
    let rownum = event.currentTarget.dataset.rownum
    let column = event.currentTarget.dataset.column
    if (status == 'N' || status == 'S') {
      let seatList = this.data.seatList.seatList
      for (let i = 0; i < seatList.length; i++) {
        if (id == seatList[i].id) {
          var setNum = {
            rownum: rownum,
            column: column
          }
          if (seatList[i].status == 'S') {
            seatList[i].status = 'N'
            selectSeatList.removeArray(setNum);
          } else if (seatList[i].status == 'N') {
            if (selectSeatList.length >= 5) {
              wx.showModal({
                title: '提示',
                content: '一笔订单最多只能选择五个座位',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            } else {
              seatList[i].status = 'S'
              selectSeatList.push(setNum)

            }
          }
        }
      }
      //console.info(seatList)
      this.setData({
        'seatList.seatList': seatList,
        'selectSeatList': selectSeatList
      })
    }
  },
  deleteSeat: function (event) {
    let rownum = event.currentTarget.dataset.rownum
    let column = event.currentTarget.dataset.column
    let seatList = this.data.seatList.seatList
    let selectSeatList = this.selectSeatList
    let setNum = {
      rownum: rownum,
      column: column
    }
    for (let i = 0; i < seatList.length; i++) {
      if (seatList[i].columnId == column && seatList[i].rowId == rownum) {console.info(123)
        seatList[i].status = 'N'
        selectSeatList.removeArray(setNum);
      }
    }
    //console.info(selectSeatList)
    this.setData({
      'seatList.seatList': seatList,
      'selectSeatList': selectSeatList
    })
  },
  toBuy: function () {
    wx.navigateTo({
      url: '',
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '大烟枪影院',
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
}
)