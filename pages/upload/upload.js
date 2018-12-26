var Bmob = require('../../utils/bmob.js');
import {
  promisify
} from '../../utils/promise.util'
import {
  $init,
  $digest
} from '../../utils/common.util'

Page({
  data: {
    titleCount: 0,
    title: '',
    daying: '',
    zhongjun: '',
    qianfeng: '',
    images: []
  },

  onLoad(options) {
    $init(this)
  },

  handleTitleInput(e) {
    const value = e.detail.value
    this.data.title = value
    this.data.titleCount = value.length
    $digest(this)
  },

  handleDaYingInput(e) {
    const value = e.detail.value
    this.data.daying = value
    $digest(this)
  },

  handleZhongJunInput(e) {
    const value = e.detail.value
    this.data.zhongjun = value
    $digest(this)
  },

  handleQianFengInput(e) {
    const value = e.detail.value
    this.data.qianfeng = value
    $digest(this)
  },

  chooseImage(e) {
    var number=6-this.data.images.length
    wx.chooseImage({
      count: number,
      sizeType: ['compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下6张照片
        this.data.images = images.length <= 6 ? images : images.slice(0, 6)
        $digest(this)
      }
    })
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images

    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },

  uploadImageAndSkill() {
    const arr = []
    wx.showLoading({
      title: '正在上传...',
      mask: true
    })
    //循环上传图片
    for (let path of this.data.images) {
      var file;
      console.log('path', path)
      file = Bmob.File('wechat.jpg', path);
    }
    file.save().then(res => {
      var skill = this.data.daying + "," + this.data.zhongjun + "," + this.data.qianfeng
      const query = Bmob.Query('image');
      query.set("skill", skill)
      query.set("detail", this.data.title)
      query.set("img", res[0])
      var needuploadRes = new Array();
      if (res.length > 1) {
        for (let i = 1; i < res.length; i++) {
          needuploadRes[i - 1] = (res[i].url)
        }
        console.log(needuploadRes)
        query.add("moreImg", needuploadRes);
      }
      query.set("type", 8)
      query.save().then(res => {
        console.log(res)
        wx.hideLoading()
        wx.showModal({
          title: '上传成功',
          showCancel: false,
          content: '管理员将在一天内审核完成',
          success: function(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '错误：' + err,
        })
      })
    })
  },
  submit(e) {
    const title = this.data.title
    const daying = this.data.daying
    const zhongjun = this.data.zhongjun
    const qianfeng = this.data.qianfeng

    if (title && daying && zhongjun && qianfeng) {
      if (this.data.images.length == 0) {
        wx.showToast({
          title: '请先选择战报',
          icon: 'none',
          duration: 2000,
          mask: false
        })
        return;
      } else {
        this.uploadImageAndSkill();
      }
    } else {
      wx.showToast({
        title: '简单介绍下战报的亮点，\n简写下技能，给大家带来更好的分享',
        icon: 'none',
        duration: 3000,
        mask: false
      })
    }
  },

  showMessage(){
    wx.showModal({
      title: '注意事项',
      showCancel: false,
      content: '1.第一张为主战报，其他五张会出现在更多战报中。\r\n2.上传的战报需要经过审核，大概一天之内处理完成。 \r\n3.入选标准：低兵力打高兵力、低等级打高等级、低红星打高红心、相同水平取得大胜的战报。队伍克制的不算是大胜。 最好是和国家队或者各种标配的战报，因为强力的队伍组合一般玩家都会给好的技能，能比较好的评估战斗力，如果是殴打黑科技那就难以判断。'
    })
  }
})