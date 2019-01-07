// pages/img_detail/img_detail.js
var Bmob = require('../../utils/bmob.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageBean: [],
    number: 0,
    plain: true,
    isCollected: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var imageBean = JSON.parse(options.imageBean);
    var int = Math.floor(Math.random() * 10)
    const query = Bmob.Query('image')
    that.setData({
      imageBean: imageBean,
      number: int
    })
    query.field('collections', this.data.imageBean.objectId)
    query.relation('_User').then(res => {
      console.log(res)
      for (let user of res.results) {
        if (app.getCurrentUserObjectId() == user.objectId) {
          that.setData({
            isCollected: true,
          })
          return;
        }
      }
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
  showImage: function() {
    wx.previewImage({
      urls: [this.data.imageBean.img.url] // 需要预览的图片http链接列表
    })
  },
  moreImage: function() {
    if (this.data.imageBean.moreImg != undefined && this.data.imageBean.moreImg.length > 1) {
      var imageBean = JSON.stringify(this.data.imageBean)
      wx.navigateTo({
        url: '../morepage/morepage?imageBean=' + imageBean
      })
    } else {
      wx.showToast({
        title: '暂无更多战报',
        icon: 'none',
        duration: 2000,
        mask: false,
      })
    }
  },
  collection: function() {
    wx.showLoading({
      title: '',
    })
    if (!this.data.isCollected) {
      const relation = Bmob.Relation('_User') // 需要关联的表
      const relID = relation.add([app.getCurrentUserObjectId()]) //关联表中需要关联的objectId, 返回一个Relation对象, add方法接受string和array的类型参数
      const query = Bmob.Query('image')
      query.get(this.data.imageBean.objectId).then(res => {
        res.set('collections', relID); // 将Relation对象保存到two字段中，即实现了一对多的关联
        res.save()
        wx.showToast({
          title: '添加收藏成功',
          duration: 2000,
          mask: false,
        })
        this.setData({
          isCollected: true,
        })
      }).catch(err => {
        console.log(err)
        wx.showToast({
          title: '添加收藏失败，因为' + err,
          duration: 2000,
          mask: false,
        })
      })
    } else {
      const relation = Bmob.Relation('_User')
      const relID = relation.remove([app.getCurrentUserObjectId()])
      const query = Bmob.Query('image')
      query.get(this.data.imageBean.objectId).then(res => {
        res.set('collections', relID);
        res.save()
        wx.showToast({
          title: '取消收藏成功',
          duration: 2000,
          mask: false,
        })
        this.setData({
          isCollected: false,
        })
      }).catch(err => {
        console.log(err)
        wx.showToast({
          title: '取消收藏失败，因为' + err,
          duration: 2000,
          mask: false,
        })
      })
    }
  },
})