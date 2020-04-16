// pages/message/message.js
const config = require('../../config')
var app = getApp()
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList:[],
    startDate: "请选择日期",
    selectDateTime: date.getFullYear() + "-" + month + "-" + currentDate ,
    multiArray: [['昨天', '前天']],
    multiIndex: [0, 0, 0]
  },
  bindStartMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      monthDay = month + "月" + day + "日";
    } else if (monthDay === "昨天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
    }


    var startDate = monthDay;
    var seletime = date.getFullYear() + "-" + that.data.multiArray[0][e.detail.value[0]];
    that.setData({
      startDate: startDate,
      selectDateTime: seletime
    })
    that.updateMessgeList();
  },
  bindMultiPickerColumnChange: function (e) {
    date = new Date();

    var that = this;

    var monthDay = ['昨天', '前天'];


    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  pickerTap: function () {
    date = new Date();

    var monthDay = [];


    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 0; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() - i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    // if (data.multiIndex[0] === 0) {
    //   if (data.multiIndex[1] === 0) {
    //     this.loadData(hours, minute);
    //   } else {
    //     this.loadMinute(hours, minute);
    //   }
    // } else {
    //   this.loadHoursMinute(hours, minute);
    // }

    data.multiArray[0] = monthDay;

    this.setData(data);
  },
  updateMessgeList(){
    var that = this;
    wx.request({
      url: config.messageList, //这里填写你的接口路径
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml据了
        'Content-Type': 'application/json',
        'Authorization': app.globalData.openid
      },
      method: "Get",
      data: {//这里写你要请求的参数
        startTime: that.data.selectDateTime,
      },
      success: function (res) {
        if (res.data.isSccuess) {
          console.log(res.data.data)
          that.setData({
            messageList: res.data.data
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateMessgeList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})