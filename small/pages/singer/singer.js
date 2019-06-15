// pages/singer/singer.js
import * as methods from './../js/header.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    sideTice: 'hot', // 侧边栏跳转锚点
    ticeShow: false, // 控制提示的显示与隐藏
    singerList: {},
    timer: '',
    startPageY: '', // 点击开始时的y距离
    endPageY: '', // 结束时的y的值
    imgSrc: 'https://y.gtimg.cn'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.getSingerList()
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
  // 获取歌手列表
  getSingerList () {
    let that = this
    let _singetList = {
      'hot': {
          title: 'hot',
          list: []
      }
    }
    wx.request({
      url: `${app.globalData.api}/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq`,
      success: function (res) {
        res.data.data.list.forEach((item, index) => {
          if (index < 10) {
            _singetList['hot'].list.push({
              img: `${that.data.imgSrc}/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`,
              name: item.Fsinger_name
            });
          }
          if (/[A-Z]/.test(item.Findex)) {
            if (!_singetList[item.Findex]) {
              _singetList[item.Findex] = {
                title: item.Findex,
                list: []
              }
              _singetList[item.Findex].list.push({
                img: `${that.data.imgSrc}/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`,
                name: item.Fsinger_name
              });
            } else {
              _singetList[item.Findex].list.push({
                img: `${that.data.imgSrc}/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`,
                name: item.Fsinger_name
              });
            } 
          }
        });
        // A-Z排序
        let keys = Object.keys(_singetList).sort();
        let obj = {};
        // 提出热门栏 其他的进行排序
        obj['hot'] = _singetList['hot'];
        keys.splice(keys.indexOf('hot'), 1);
        for (let i = 0; i < keys.length; i++) {
          obj[keys[i+1]] = _singetList[keys[i]]
        }
        that.setData({
          singerList: obj
        })
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  // 顶部切换
  changeIndex(event) {
    methods.changeIndex(event);
  },
  // 侧边栏点击定位
  changeItem (event) {
    console.log(event.currentTarget.dataset.sideIndex)
    this.data.startPageY = event.touches[0].pageY
    let that = this
    this.setData({
      sideTice: event.currentTarget.dataset.sideItem,
      ticeShow: true
    })
    if (this.data.timer) {
      clearTimeout(this.data.timer)
    }
    this.data.timer = setTimeout(() => {
      that.setData({
        ticeShow: false
      })
    }, 1000)
  },
  // 侧边移动
  sideMove (event) {
    console.log(event.touches[0])
  }
})