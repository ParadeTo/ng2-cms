// 开发
// const server = {
//   host: 'http://localhost:80',
//   apiBaseUrl: '/rest/'
// };
// export const TemplateUrl = server.host + 'reward-console/users.xls';
// export const baseUrl = '/reward';
 
// 测试
// const server = {
//   host: 'http://192.168.10.33:8611/',
//   apiBaseUrl: 'rest/'
// };
// export const TemplateUrl = server.host + 'users.xls';
// export const baseUrl = '';

// 生产
const server = {
  host: 'http://203.195.173.251:8611/',
  apiBaseUrl: 'rest/'
};
export const TemplateUrl = server.host + 'users.xls';
export const baseUrl = '/reward-console';

export const Account = {
  username: 'super',
  password: 'netfinworks'
};

// 登录后设置一个cookie
export const COOKIE_NAME = '88mmmoney';

export const Api = {
  // 图片上传
  uploadImg : {
    method:'post',
    url:server.host + server.apiBaseUrl + 'couponImageFile'
  },
  // 券模板
  couponTemplate :{
    method:'get',
    url:server.host + server.apiBaseUrl + 'couponTemplate'
  },
  addCouponTemplate :{
    method:'post',
    url:server.host + server.apiBaseUrl + 'couponTemplate'
  },
  modifyCouponTemplate :{
    method:'put',
    url:server.host + server.apiBaseUrl + 'couponTemplate'
  },
  // 券实例
  couponUse : {
    method:'get',
    url:server.host + server.apiBaseUrl + 'couponUse'
  },
  grantCoupons : {
    method:'post',
    url:server.host + server.apiBaseUrl + 'batchCouponItem'
  },
  modifyCoupon : {
    method:'put',
    url:server.host + server.apiBaseUrl + 'couponUse'
  },
  // 上传批量发放用户名单接口
  uploadUserFile : {
    method:'post',
    url:server.host + server.apiBaseUrl + 'couponUserFile'
  },
  // 活动
  activity: {
    method:'get',
    url:server.host + server.apiBaseUrl + 'activity'
  },
  addActivity: {
    method: 'post',
    url:server.host + server.apiBaseUrl + 'activity'
  },
  modifyActivity: {
    method: 'put',
    url:server.host + server.apiBaseUrl + 'activity'
  }
};

export const CouponList = [
  // {id:'101' ,text: '现金券'},
  // {id:'102' ,text: '奖金券'},
  // {id:'103' ,text: '积分券'},
  // {id:'104' ,text: '加息券'},
  // {id:'105' ,text: '抵用券'},
  {id:'109' ,text: '商品券'}
];

export const CouponDict = {
  '101':'现金券',
  '102':'奖金券',
  '103':'积分券',
  '104':'加息券',
  '105':'抵用券',
  '109':'商品券'
};

export const ExchangeList = [
  {id:'1' ,text: '提交微信'},
  {id:'2' ,text: '短信兑换码'},
  {id:'3' ,text: '物流发货'},
  {id:'4' ,text: '人工联系'},
  {id:'5' ,text: '现场兑换'}
];

export const ExchangeDict = {
  '1':'提交微信',
  '2':'短信兑换码',
  '3':'物流发货',
  '4':'人工联系',
  '5':'现场兑换'
};

export const TimeList = [
  {id:'1' ,text: '分'},
  {id:'2' ,text: '时'},
  {id:'3' ,text: '天'},
];

export const InvestList = [
  {id:'1' ,text: '活期'},
  {id:'2' ,text: '定期'}
];

export const StatusList = [
  {id:'-1' ,text: '所有'},
  {id:'0' ,text: '未兑换'},
  {id:'1' ,text: '兑换中'},
  {id:'2' ,text: '已兑换'},
  // {id:'3' ,text: '已过期'},
];

export const StatusDict = {
  '0' : '未兑换',
  '1' : '兑换中',
  '2' : '已兑换',
  '3' : '已过期'
};

export const Conf = {
  itemsPerPage : 20, // 每页数据
  maxPages: 5 // 可以看见的页数，其他显示为...
};
