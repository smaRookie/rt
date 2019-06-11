// 传递顶部按钮的标签
export function changeIndex(event) {
  let _index = event.currentTarget.dataset.headeritemindex
  console.log(_index)
  if (_index == 0) {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
  if (_index == 1) {
    wx.switchTab({
      url: '/pages/singer/singer'
    })
  }
  if (_index == 2) {
    console.log('aaaa')
    wx.switchTab({
      url: '/pages/rank/rank'
    })
  }
  if (_index == 3) {
    wx.switchTab({
      url: '/pages/search/search'
    })
  }
};

export function mine () {
  wx.navigateTo({
    url: '/pages/mine/mine',
  })
}