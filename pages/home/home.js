var Bmob = require('../../utils/bmob.js');
// pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateString: "v1.0.8 更新首页野地难度表，适用征服赛季。提供战报收藏功能，在战报详情页收藏或取消收藏，个人中心页可查看收藏列表 \r\nv1.0.7 战报详情页点击图片可保存到手机或发送给朋友，首页新增野地难度表和征服五级地技能表 \r\nv1.0.6 新增个人中心，首页战报上传页面 \r\nv1.0.5 新增更新日志，添加手游观察周刊关注位置 \r\nv1.0.4 新增底部科技、标配等栏目分类"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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
   * 跳转抽将视频列表
   */
  onShareAppMessage: function() {
      
  },
  onYedi: function() {
    wx.previewImage({
      urls: ["http://bmob-cdn-14564.b0.upaiyun.com/2018/12/29/e77ed83a40ebc4558041eaae29307378.jpg"]
    })
  },
  onWuji: function() {
    wx.previewImage({
      urls: ["http://bmob-cdn-14564.b0.upaiyun.com/2018/01/21/f670003740919ef0807b5b59526dfdd6.jpg"]
    })
  },

  onUpload: function() {
    wx.navigateTo({
      url: '../upload/upload',
    })
  }
})