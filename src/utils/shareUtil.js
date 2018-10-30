
const pageWidth = 375
const pageHeight = 667

const getHaiBao = (ctx, backImg) => {
  ctx.drawImage(backImg, 0, 0, pageWidth, pageHeight)
}

const getHeadImg = (ctx, headImg) => {
  // ctx.save() // 先..保存状态 已便于画完圆再用
  ctx.beginPath() // 开始绘制
  // 先画个圆
  ctx.arc(70, 147, 24, 0, Math.PI * 2, false)
  ctx.setFillStyle('#ffffff')
  ctx.fill()

  // 画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
  ctx.clip()
  ctx.drawImage(headImg, 48, 125, 45, 45) // 推进去图片
}

const getQrImg = (ctx, setQrImg) => {
  ctx.drawImage(setQrImg, 225, 420, 100, 100)
}

var shareUtil = {
  setBackImg (backImg) {
    this.backImg = backImg
  },

  setQrImg (qrImg) {
    this.qrImg = qrImg
  },

  setHeadImg (headImg) {
    this.headImg = headImg
  },

  setCTX (ctx) {
    this.ctx = ctx
  },

  setMiniCode (img) {
    this.miniCodeImg = img
  },

  drawQRCodeImg () {
    getHaiBao(this.ctx, this.backImg)
    getQrImg(this.ctx, this.qrImg)
    getHeadImg(this.ctx, this.headImg)
  }
}

export default shareUtil
