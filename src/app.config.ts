export default {
  pages: [
    'pages/home/index',
    'pages/user/index',
    'pages/activity/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // custom: true,
    color: '#999999',
    selectedColor: '#222222',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [{
      pagePath: 'pages/home/index',
      text: '首页',
      iconPath: '',
      selectedIconPath: '',
    }, {
      pagePath: 'pages/activity/index',
      text: '活动',
      iconPath: '',
      selectedIconPath: '',
    }, {
      pagePath: 'pages/user/index',
      text: '我的',
      iconPath: '',
      selectedIconPath: '',
    }]
  }
}
