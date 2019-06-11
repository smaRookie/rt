Page({
  onLoad: function (option) {
    this.setData({
      dissid: option.dissid
    });
    this.getData();
  },
  onPageScroll: function (e) {
    console.log(e, '===')
  },
  data: {
    dissid: '',
    imgUrl: '',
    musicList: []
  },
  // 获取数据
  getData () {
    let that = this;
    wx.request({
      url: `http://119.23.187.80:8081/api-getList/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${this.data.dissid}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`,
      success: function (res) {
        console.log(res.data.cdlist[0])
        that.setData({
          imgUrl: res.data.cdlist[0].logo,
          musicList: res.data.cdlist[0].songlist
        })
      }
    })
  },
  move (e) {
    console.log(e, 111)
  },
  handleScroll (event) {
    console.log(event, 'aa')
    if (event.detail.scrollTop <= 2) {
      wx.startPullDownRefresh({
        success: function (e) {
          console.log(e)
        }
      })
    }
  }
})