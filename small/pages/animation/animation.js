Page({
  onLoad () {
    this.animation = wx.createAnimation()
  },
  rotate () {
    console.log('asddsa')
    this.animation.rotate(-90, 90).step();
    this.setData({
      animation: this.animation.export()
    })
  },
  download () {
    wx.downloadFile({
      url: 'http://119.23.187.80/fileTest/1.txt',
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err)
      }
    })
  }
})