// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    markers: [{
      id: 0,
      longitude: '104.06327',
      latitude: '30.66074',
      title: '天府广场',
      callout: {
        content: '天赋',
        color: '#ffcd32',
        borderRadius: 5,
        borderWidth: 15,
        padding: 10,
        borderColor: '#ffcd32',
        bgColor: '#222',
        textAlign: 'center',
        display: 'BYCLICK'
      },
      label: {
        content: '其他',
        color: '#666',
        anchorX: 50,
        anchorY: -20,
        bgColor: '#fff',
        borderWidth: 15
      }
    }],
    polyline: [{
      points: [
        { longitude: "104.06327", latitude: "30.66074"},
        { longitude: "104.1449069090", latitude:"30.6065370846"},
        { longitude: "104.0545664775", latitude: "30.6523128899" }
      ],
      color: "#FF0000DD",
      width: 1,
      borderWidth: 1
    }],
    controls: [{
      id: 1,
      iconPath: './../../images/icon/portrait.png',
      position: {
        left: 0,
        top: 10,
        width: 80,
        height: 80
      },
      clickable: true
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
    wx.setBackgroundTextStyle({
      textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
    })
    wx.setBackgroundColor({
      backgroundColorTop: '#333333', // 顶部窗口的背景色为白色
      backgroundColorBottom: '#222222', // 底部窗口的背景色为白色
    })
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
    try {
      const res = wx.getSystemInfoSync()
      const r = wx.getLaunchOptionsSync()
      console.log(res)
      console.log(r, 111)
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  init () {
    let that = this;
    let context = wx.createMapContext("map");
    wx.getLocation({
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
    console.log(context)
  }
})