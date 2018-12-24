Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    id: "",
    hasMoreData: true,
    pageIndex: 0,
    pageSize: 15,
    isLoading: false,
    results: []
  },
  intoDetailPage: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    var imageBean = JSON.stringify(this.data.results[index])
    wx.navigateTo({
      url: '../img_detail/img_detail?imageBean=' + imageBean
    })
  },
  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    this.getList(0)
  },
  getList: function (index) {
    var that = this//不要漏了这句，很重要 
    wx.request({
      url: 'https://api.bmob.cn/1/classes/image',
      data: {
        limit: this.data.pageSize,
        skip: index * this.data.pageSize,
        order: '-iid',
        where: '{"type":{"$nin":[7,8,9]}}',
      },
      header: {
        'content-type': 'application/json',
        'X-Bmob-Application-Id': '196fafe2b684a1303395f47ceedb48c1',
        'X-Bmob-REST-API-Key': '0fadff7a1495c380c812f8ff33dd8571'
      },
      success: function (res) {
        console.log(res.data)
        if (index == 0) {
          wx.stopPullDownRefresh({
            complete: that.updateDom(res)
          })
        } else {
          that.updateDom(res)
        }
      }
    })
  },
  updateDom: function (res) {
    this.setData({ results: this.data.results.concat(res.data.results), isLoading: false })
    if (this.data.pageSize > res.data.results.Length) {
      this.setData({ hasMoreData: false })
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
    if (!this.data.isLoading) {
      this.setData({ hasMoreData: true, pageIndex: 0, results: [], isLoading: true })
      this.getList(0)
    }
  },

  /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function () {
    if (this.data.hasMoreData && !this.data.isLoading) {
      this.setData({ pageIndex: this.data.pageIndex + 1, isLoading: true })
      this.getList(this.data.pageIndex)
    }
  },

  /** 
   * 用户点击右上角分享 
   */
  onShareAppMessage: function () {

  }
})