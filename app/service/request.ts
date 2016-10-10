import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Api } from '../config/server.config';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RequestService {

  private requestOptions =  new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' })});

  constructor(
    public http: Http
  ) {

  }

  /**
   * [urlEncode]
   * @param  {Object}  param  [将要转为URL参数字符串的对象]
   * @param  {string}  key    [URL参数字符串的前缀]
   * @param  {boolean} encode [是否进行URL编码,默认为true]
   * @return {string}         [URL参数字符串]
   */
  urlEncode(param: any, key?: string, encode?: boolean): string {
    if (param === null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += '&' + key + '=' + ((encode === null || encode) ? encodeURIComponent(param) : param);
    } else {
      for (var i in param) {
        if ((param[i] && param[i] !== '') || param[i] === 0) {
          var k = !key ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
          paramStr += this.urlEncode(param[i], k, encode);
        }
      }
    }
    return paramStr;
  }

  /**
   * 根据返回的状态码，判断是否进行重定向
   * @param {Response} res [description]
   */
   dealRes (res:Response) {
     var data = res.json();
     if ( data && data.code === -2 ) {
       window.location.href = data.loginUrl;
     } else {
       return data;
     }
   }

  // 活动
  /**
   * 获取活动列表
   * @param  {Object}            params 请求参数
   * @return {Observable<any[]>}        [description]
   */
  getActivities(params?: Object): Observable<any[]> {
    var query = this.urlEncode(params) || '';
    return this.http[Api.activity.method](Api.activity.url + '?' + query)
      .map((res: Response) =>{
         return this.dealRes(res);
      })
      .catch((error: any) => {
        Observable.throw(error.json().error || 'Server error')
      });
  }
  /**
   * 增加活动
   * @param  {Object}            params 请求参数
   * @return {Observable<any[]>}        [description]
   */
  addActivity(params: Object): Observable<any[]> {
    return this.http[Api.addActivity.method](Api.addActivity.url, JSON.stringify(params), this.requestOptions)
      .map((res: Response) =>{
         return this.dealRes(res);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * 修改活动
   * @param  {Object}            params 请求参数
   * @return {Observable<any[]>}        [description]
   */
  modifyActivity(params: Object): Observable<any[]> {
    return this.http[Api.modifyActivity.method](Api.modifyActivity.url, JSON.stringify(params), this.requestOptions)
      .map((res: Response) =>{
         return this.dealRes(res);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // 券模板
  /**
   * 获取券模板列表
   * @param  {Object}            params [请求参数]
   * @return {Observable<any[]>}        [description]
   */
  getCouponsTmp(params?: Object): Observable<any[]> {
    var query = this.urlEncode(params) || '';
    return this.http[Api.couponTemplate.method](Api.couponTemplate.url + '?' + query)
      .map((res: Response) =>{
         return this.dealRes(res);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * 增加券模板列表
   * @param  {Object}            params 请求参数
   * @return {Observable<any[]>}        [description]
   */
  addCouponTmp(params: Object): Observable<any[]> {
    return this.http[Api.addCouponTemplate.method](Api.addCouponTemplate.url, JSON.stringify(params), this.requestOptions)
      .map((res: Response) =>{
         return this.dealRes(res);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * 修改券模板列表
   * @param  {Object}            params 请求参数
   * @return {Observable<any[]>}        [description]
   */
  modifyCouponTmp(params: Object): Observable<any[]> {
    return this.http[Api.modifyCouponTemplate.method](Api.modifyCouponTemplate.url, JSON.stringify(params), this.requestOptions)
      .map((res: Response) =>{
         return this.dealRes(res);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // 券实例
  /**
   * 发放券
   * @param  {Object}            params 请求参数
   * @return {Observable<any[]>}        [description]
   */
  grantCoupons(params: Object) : Observable<any[]> {
    return this.http[Api.grantCoupons.method](Api.grantCoupons.url, JSON.stringify(params), this.requestOptions)
      .map((res: Response) =>{
         return this.dealRes(res);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * 获取券实例
   * @param  {Object}            params 请求参数
   * @return {Observable<any[]>}        [description]
   */
  getCoupons(params?: Object) : Observable<any[]> {
    var query = this.urlEncode(params) || '';
    return this.http[Api.couponUse.method](Api.couponUse.url + '?' + query)
      .map((res: Response) =>{
         return this.dealRes(res);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * 修改券实例
   * @param  {Object}            params [请求参数]
   * @return {Observable<any[]>}        [description]
   */
  modifyCoupon(params:Object) : Observable<any[]> {
    return this.http[Api.modifyCoupon.method](Api.modifyCoupon.url, JSON.stringify(params), this.requestOptions)
      .map((res: Response) =>{
         return this.dealRes(res);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
