let app = getApp();
let api = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: [{
      name: '意见反馈',
      fun: 'showFeedback'
    }, {
      name: '联系我们',
      fun: 'contactMe'
    }, {
      name: '消息管理',
      fun: 'message'
    }],
    showFeedback: false,
    showMask: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        isLogin: true
      });
    }
  },

  showFeedback() {
    this.setData({
      showFeedback: true,
      showMask: true
    });
  },

  hiddenFeedback() {
    this.setData({
      showFeedback: false,
      showMask: false
    });
  },

  doFeedback(e) {
    if (this.trim(e.detail.value.feedback) == '') {
      wx.showToast({
        title: '请输入反馈内容',
        icon: 'none'
      });
      return;
    }
    let feedback = e.detail.value.feedback;
    let user = app.globalData.user
    this.hiddenFeedback();
    wx.showToast({
      title: '提交成功',
      icon: 'none'
    });
  },

  contactMe() {
    wx.showModal({
      title: '联系我们',
      content: '有问题请联系\n 897884959@qq.com',
      showCancel: false
    })
  },
  message() {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  onGotUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.setStorageSync('userInfo', e.detail.userInfo);
      this.setData({
        userInfo: e.detail.userInfo,
        isLogin: true
      });
    }
  },

  trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  }

})