// pages/morepage/morepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageBean: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var imageBean = JSON.parse(options.imageBean);
    console.log(imageBean.moreImg)
    var int = Math.floor(Math.random() * 10)
    that.setData({
      imageBean: imageBean,
      number: int
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
  showImage: function (res) {
    var index = res.currentTarget.dataset.index;
    wx.previewImage({
      urls: [this.data.imageBean.moreImg[index]] // 需要预览的图片http链接列表
    })
  },
})