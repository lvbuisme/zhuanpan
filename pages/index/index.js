//index.js
//获取应用实例
var app = getApp()
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();

var common = require("../../utils/util.js")
const config = require('../../config')
Page({
  data: {
    historyFood:'',
    circleList: [],//圆点数组
    awardList: [],//奖品数组
    colorCircleFirst: '#FFDF2F',//圆点颜色1
    colorCircleSecond: '#FE4D32',//圆点颜色2
    colorAwardDefault: '#F5F0FC',//奖品默认颜色
    colorAwardSelect: '#ffe400',//奖品选中颜色
    indexSelect: 0,//被选中的奖品index
    isRunning: false,//是否正在抽奖
    imageAward: [
      '../../images/hsqz.jpg',
      '../../images/hsr.jpg',
      '../../images/hmj.jpg',
      '../../images/lzlm.jpg',
      '../../images/mpdf.jpg',
      '../../images/nxmt.jpg',
      '../../images/wm.jpg',
      '../../images/xalp.jpg',
    ],//奖品图片数组
    imageName:[
      '红烧茄子',
      '红烧肉',
      '黄焖鸡',
      '兰州拉面',
      '麻婆豆腐',
      '奶香馒头',
      '外卖',
      '西安凉皮',
    ],
    startDate: "请选择日期",
    selectDateTime:"",
    multiArray: [['昨天', '前天']],
    multiIndex: [0, 0, 0]
  },
  extraLine: [],
  oldHistoryFood: [],
  getUserInfo:function(info) {
    const userInfo = info.detail.userInfo
    this.setData({
      userInfo,
      hasUserInfo: true
    })
  },
  loadData: function (hours, minute) {

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
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
    that.initHistoryFood();
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
  login: function(){
 
    const that = this
    if (than.hasUserInfo != true) {

    }
  },
  onReady:function(){
    var than=this;
    app.getUserInfo(function () {
      //登陆成功回调
      than.initHistoryFood();
    });
    
  },
  onLoad: function () {
    var _this = this;
    //圆点设置
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var circleList = [];
    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        topCircle = 15;
        leftCircle = 15;
      } else if (i < 6) {
        topCircle = 7.5;
        leftCircle = leftCircle + 102.5;
      } else if (i == 6) {
        topCircle = 15
        leftCircle = 620;
      } else if (i < 12) {
        topCircle = topCircle + 94;
        leftCircle = 620;
      } else if (i == 12) {
        topCircle = 565;
        leftCircle = 620;
      } else if (i < 18) {
        topCircle = 570;
        leftCircle = leftCircle - 102.5;
      } else if (i == 18) {
        topCircle = 565;
        leftCircle = 15;
      } else if (i < 24) {
        topCircle = topCircle - 94;
        leftCircle = 7.5;
      } else {
        return
      }
      circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
    }
    this.setData({
      circleList: circleList
    })
    //圆点闪烁
    setInterval(function () {
      if (_this.data.colorCircleFirst == '#FFDF2F') {
        _this.setData({
          colorCircleFirst: '#FE4D32',
          colorCircleSecond: '#FFDF2F',
        })
      } else {
        _this.setData({
          colorCircleFirst: '#FFDF2F',
          colorCircleSecond: '#FE4D32',
        })
      }
    }, 500)
    //奖品item设置
    var awardList = [];
    //间距,怎么顺眼怎么设置吧.
    var topAward = 25;
    var leftAward = 25;
    for (var j = 0; j < 8; j++) {
      if (j == 0) {
        topAward = 25;
        leftAward = 25;
      } else if (j < 3) {
        topAward = topAward;
        //166.6666是宽.15是间距.下同
        leftAward = leftAward + 166.6666 + 15;
      } else if (j < 5) {
        leftAward = leftAward;
        //150是高,15是间距,下同
        topAward = topAward + 150 + 15;
      } else if (j < 7) {
        leftAward = leftAward - 166.6666 - 15;
        topAward = topAward;
      } else if (j < 8) {
        leftAward = leftAward;
        topAward = topAward - 150 - 15;
      }
      var imageAward = this.data.imageAward[j];
      awardList.push({ topAward: topAward, leftAward: leftAward, imageAward: imageAward });
    }
    this.setData({
      awardList: awardList
    })
   
  },
  
  initHistoryFood: function(){
    var than =this;
    than.extraLine=[]
    wx.request({
      url: config.historyfoodUrl, //这里填写你的接口路径
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml据了
        'Content-Type': 'application/json',
        'Authorization': app.globalData.openid
      },
      method: "Get",
      data: {//这里写你要请求的参数
        dateTime: than.data.selectDateTime
       },
      success: function (res) {
        //这里就是请求成功后，进行一些函数操作
        //than.oldHistoryFood =new Array();
        than.oldHistoryFood=res.data.data;
        var len = than.oldHistoryFood.length;
        for (var i = 0; i < len;i++){
          var datetime = new Date(res.data.data[i].createTime);
          than.extraLine.push(res.data.data[i].foodName + "__" + datetime.format("yyyy年MM月dd日hh:mm"))
          //than.extraLine.push('\n')
        }
        than.setData({
          historyFood: than.extraLine.join('\n'),
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  addFood:function(foodName){
    this.extraLine.push(foodName + "__" + (new Date).format("yyyy年MM月dd日hh:mm"))
    this.setData({
      historyFood: this.extraLine.join('\n'),
    })
    setTimeout(() => {
      this.setData({
        scrollTop: 99999
      })
    }, 0)
  },
  //开始游戏
  startGame: function () {
    if (this.data.isRunning) return
    this.setData({
      isRunning: true
    })
    var _this = this;
    var indexSelect = 0
    var i = 0;
    var randomNumber = 15 + Math.ceil(Math.random() * 8); ;
    var timer = setInterval(function () {
      indexSelect++;
      indexSelect = indexSelect % 8;
      //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度
      i += 1;
      if (i == randomNumber) {
        
        //去除循环
        clearInterval(timer)
        //获奖提示
        wx.showModal({
          title: '吃',
          content: '吃' + _this.data.imageName[indexSelect],
          showCancel: false,//去掉取消按钮
          success: function (res) {
            if (res.confirm) {
              _this.setData({
                isRunning: false
              })
            }
          }
        })
        wx.request({
        
          url: config.addfoodUrl, //这里填写你的接口路径
          header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml据了
            'Content-Type': 'application/json',
            'Authorization': app.globalData.openid
          },
          method:"Post",
          data: {//这里写你要请求的参数
            'foodName': _this.data.imageName[indexSelect]
          },
          success: function (res){
            //这里就是请求成功后，进行一些函数操作
            _this.addFood(_this.data.imageName[indexSelect]);
          },
          fail:function(err){
            console.log(err)
          }
        })
      }
      
      _this.setData({
        indexSelect: indexSelect
      })
     
    }, (200 + i))
  
  }
})
