Page({
  data: {
    inputShowed: false,
    inputVal: "",
    id: "",
    hasMoreData: true,
    pageIndex: 0,
    pageSize: 15,
    isLoading: false,
    results: []
  },
  intoDetailPage: function(e) {
    var index = parseInt(e.currentTarget.dataset.index)
    var imageBean = JSON.stringify(this.data.results[index])
    wx.navigateTo({
      url: '../img_detail/img_detail?imageBean=' + imageBean
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  getList: function (index) {
    var that = this//不要漏了这句，很重要 
    wx.request({
      url: 'https://api.bmob.cn/1/classes/image',
      data: {
        limit: this.data.pageSize,
        skip: index * this.data.pageSize,
        order: '-iid',
        where: '{"type":{"$nin":[7,8,9]},"member_array":"' + this.data.inputVal + '"}',
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
  search: function(e) {
    var that = this //不要漏了这句，很重要 
    that.setData({
      results: []
    });
    wx.request({
      url: 'https://api.bmob.cn/1/classes/image',
      data: {
        limit: this.data.pageSize,
        order: '-iid',
        where: '{"type":{"$nin":[7,8,9]},"member_array":"' + this.data.inputVal + '"}',
      },
      header: {
        'content-type': 'application/json',
        'X-Bmob-Application-Id': '196fafe2b684a1303395f47ceedb48c1',
        'X-Bmob-REST-API-Key': '0fadff7a1495c380c812f8ff33dd8571'
      },
      success: function(res) {
        console.log(res.data)
        wx.stopPullDownRefresh({
          complete: that.updateDom(res)
        })
      }
    })
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  updateDom: function(res) {
    this.setData({
      results: this.data.results.concat(res.data.results),
      isLoading: false
    })
    if (this.data.pageSize > res.data.results.length) {
      this.setData({
        hasMoreData: false
      })
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
});