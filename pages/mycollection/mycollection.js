var Bmob = require('../../utils/bmob.js');
var app = getApp();
// pages/mycollection/mycollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '请等待',
    })
    var that = this //不要漏了这句，很重要 
    const query = Bmob.Query("image");
    query.statTo("where", '{"collections":{"$inQuery":{"where":{"objectId":"' + app.getCurrentUserObjectId() + '"},"className":"_User"}}}');
    query.find().then(res => {
      console.log(res)
      this.setData({
        results: res,
      })
      wx.hideLoading()
    });
  },
  
  intoDetailPage: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    var imageBean = JSON.stringify(this.data.results[index])
    wx.navigateTo({
      url: '../img_detail/img_detail?imageBean=' + imageBean
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})