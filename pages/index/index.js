//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
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
    ]
  },
  setDisabled: function (e) {
    console.log("测试")
    wx.request({
      url: 'https://ilvbu.xyz:9011/WX/Login',
      method: "Get",
      success: function (res) {
        //这里就是请求成功后，进行一些函数操作
        console.log(res.data)
      },
      fail: function (err) {
        console.log(err)
      }
    })
    
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
          url: 'https://ilvbu.xyz:9011/AddFood', //这里填写你的接口路径
          header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml据了
            'Content-Type': 'application/json'
          },
          method:"Post",
          data: {//这里写你要请求的参数
            'foodName': _this.data.imageName[indexSelect]
          },
          success: function (res) {
            //这里就是请求成功后，进行一些函数操作
            console.log(res.data)
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
