import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
// import { createQuestion } from '../../services/question.service'
// import config from '../../config'

// const wxUploadFile = promisify(wx.uploadFile)

Page({

  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
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

  handleContentInput(e) {
    const value = e.detail.value
    this.data.content = value
    this.data.contentCount = value.length
    $digest(this)
  },

  chooseImage(e) {
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
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

  // submitForm(e) {
  //   const title = this.data.title
  //   const content = this.data.content

  //   if (title && content) {
  //     const arr = []

  //     for (let path of this.data.images) {
  //       arr.push(wxUploadFile({
  //         url: config.urls.question + '/image/upload',
  //         filePath: path,
  //         name: 'qimg',
  //       }))
  //     }

  //     wx.showLoading({
  //       title: '正在创建...',
  //       mask: true
  //     })

  //     Promise.all(arr).then(res => {
  //       return res.map(item => JSON.parse(item.data).url)
  //     }).catch(err => {
  //       console.log(">>>> upload images error:", err)
  //     }).then(urls => {
  //       return createQuestion({
  //         title: title,
  //         content: content,
  //         images: urls
  //       })
  //     }).then(res => {
  //       const pages = getCurrentPages();
  //       const currPage = pages[pages.length - 1];
  //       const prevPage = pages[pages.length - 2];

  //       prevPage.data.questions.unshift(res)
  //       $digest(prevPage)

  //       wx.navigateBack()
  //     }).catch(err => {
  //       console.log(">>>> create question error:", err)
  //     }).then(() => {
  //       wx.hideLoading()
  //     })
  //   }
  // }

})