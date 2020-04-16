const config = require('./config')
App({
  onLaunch(opts) {
    console.log('App Launch', opts)
  },
  onShow(opts) {
    console.log('App Show', opts)
  },
  onHide() {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null,
    userInfo: null
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.hasLogin) {
      cb()
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.login({
            success(data) {
           
              that.globalData.hasLogin = true
              wx.request({
                url: config.loginUrl,
                header: {
                  'Content-Type': 'application/json'
                },
                method: "Get",
                data: {//这里写你要请求的参数
                  code: data.code
                },
                success: function (res) {
                  //这里就是请求成功后，进行一些函数操作
                
                  that.globalData.openid = res.data
                  cb()
                },
                fail: function (err) {
                  console.log(err)
                }
              })
            }
          });
        }
      })
    }
  }
})