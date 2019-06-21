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
  // lazy loading openid
  // getUserOpenId(callback) {
  //   console.log("getUserOpenId========================================");
  //   const self = this
  //   if (self.globalData.openid) {
  //     callback(null, self.globalData.openid)
  //   } else {
  //     wx.login({
  //       success(data) {
  //         wx.request({
  //           url: config.openIdUrl,
  //           data: {
  //             code: data.code
  //           },
  //           success(res) {
  //             console.log('拉取openid成功', res)
  //             self.globalData.openid = res.data.openid
  //             callback(null, self.globalData.openid)
  //           },
  //           fail(res) {
  //             console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
  //             callback(res)
  //           }
  //         })
  //       },
  //       fail(err) {
  //         console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
  //         callback(err)
  //       }
  //     })
  //   }
  // }
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
                // url: 'https://ilvbu.xyz:8001/wx/login', //这里填写你的接口路径
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