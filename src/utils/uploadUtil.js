/*
 * 图片上传相关方法
 */
let obj = {

  // 上传多张图片
  uploadAllPhotos (images) {
    let self = this

    let promises = []
    images.forEach((item, index) => { promises.push(self.uploadPhoto(item)) })

    return Promise.all(promises)
  },

  // 获取多张图片信息
  getPhotosInfo (item, index) {
    return new Promise(resolve => {
      let promises = []
      item.imgs.forEach(imgUrl => { promises.push(this.getImageInfo(imgUrl)) })

      Promise.all(promises).then((res) => {
        resolve && resolve({res, index})
      }).catch(() => {})
    })
  },

  // 获取单张图片信息
  getPhotoInfo (img, isTempFile) {
    return new Promise(resolve => {
      wx.getImageInfo({
        src: img,
        success (res) {
          let imgWidth = res.width
          let imgHeight = res.height
          let imgUrl = (isTempFile ? res.path : img)
          resolve && resolve({imgWidth, imgHeight, imgUrl})
        },
        fail () {
          if (isTempFile) {
            resolve && resolve()
          } else {
            resolve && resolve({imgWidth: 0, imgHeight: 0})
          }
        }
      })
    })
  }
}
export default obj
