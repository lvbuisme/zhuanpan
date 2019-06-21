/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

const host = 'ilvbu.xyz:8001'
const requesHttp='https'
const config = {

  // 下面的地址配合云端 Server 工作
  host,

  // 登录地址，用于建立会话
  loginUrl: requesHttp+`://${host}/weChat/login`,
  
  // 添加服务记录
  addfoodUrl: requesHttp +`://${host}/weChat/addFood`,
  //获取历史食物记录
  historyfoodUrl: requesHttp + `://${host}/weChat/FoodList`

}

module.exports = config
