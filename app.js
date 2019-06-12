//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
     
        success: function () {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'http:localhost:55314/WX/Login',
              method: "Get",
              data: {
                code: res.code
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
  
    }
  },
  globalData:{
    userInfo:null
  }
})