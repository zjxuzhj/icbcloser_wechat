// pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateString:"v1.0.6 新增个人中心，首页添加抽将视频页 \n\nv1.0.5 新增更新日志，添加手游观察周刊关注位置 \n\nv1.0.4 新增底部科技、标配等栏目分类"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 跳转抽将视频列表
   */
  onShareAppMessage: function () {

  },
  onChooseVideo: function () {
    wx.navigateTo({
      url: '../videolist/videolist',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
})