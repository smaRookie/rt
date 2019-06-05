// pages/home/home.js
import * as methods from './../js/header.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: {
      a: 'ss'
    },
    index: 0,
    musData: {},
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUrl()
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
  //  获取轮播图片
  getUrl () {
    let that = this
    wx.request({
      url: `${app.globalData.api}/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1557996307551&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1`,
      success: function (res) {
        that.setData({
          musData: res.data.data
        });
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  // 获取热门歌单
  getList() {
    let that = this
    wx.request({
      url: `http://119.23.187.80:8081/api-getList/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.17651585636645106&format=json`,
      header: {
        host: 'c.y.qq.com',
        referer: 'https://y.qq.com/'
      },
      success: function (res) {
        that.setData({
          list: res.data.data.list
        });
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  // 滑动到底部触发
  toBottom () {
    console.log('滚动到底');
  },
  // 传递顶部按钮的标签
  changeIndex (event) {
    methods.changeIndex(event)
  },
  toDetail (event) {
    let id = event.currentTarget.dataset.itemMsg
    console.log(event)
    wx.navigateTo({
      url: `../hDetail/hDetail?dissid=${id}`
    })
  },
  mine () {
    methods.mine()
    // 本地存储
    var value = wx.getStorageSync('test')
    if (!value) {
      return 0
    } else {
      // 同步方法才可以这么些， 异步需要传对象
      wx.setStorageSync('test', 'other')
    }
  }
})