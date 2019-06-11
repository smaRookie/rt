// pages/rank/rank.js
import * as methods from './../js/header.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 2,
    rankList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
  // 获取排行数据
  getList () {
    let that = this;
    wx.request({
      url: `${app.globalData.api}/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&uin=0&needNewCode=1&platform=yqq.json`,
      success: function (res) {
        let a = res.data.split('MusicJsonCallback(')[1];
        let result = JSON.parse(res.data.split('MusicJsonCallback(')[1].substr(0, a.length - 1));
        that.setData({
          rankList: result.data.topList
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 点解顶部按钮事件
  changeIndex (event) {
    methods.changeIndex(event)
  }
})