var Bmob = require('utils/bmob.js');
Bmob.initialize("196fafe2b684a1303395f47ceedb48c1", "0fadff7a1495c380c812f8ff33dd8571");
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
    this.getCurrentUserObjectId();
  },
  globalData: {
    userInfo: null
  },
  getCurrentUserObjectId: function(){
    var app = getApp();
    //获取用户当前信息
    let current = Bmob.User.current()
    if (current == null) {
      Bmob.User.auth().then(res => {
        return res.objectId;
      }).catch(err => {
        console.log(err)
      });
    } else {
      return current.objectId;
    }
  },
})