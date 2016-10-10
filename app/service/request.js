"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var server_config_1 = require('../config/server.config');
var Rx_1 = require('rxjs/Rx');
var RequestService = (function () {
    function RequestService(http) {
        this.http = http;
        this.requestOptions = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
    }
    RequestService.prototype.urlEncode = function (param, key, encode) {
        if (param === null)
            return '';
        var paramStr = '';
        var t = typeof (param);
        if (t === 'string' || t === 'number' || t === 'boolean') {
            paramStr += '&' + key + '=' + ((encode === null || encode) ? encodeURIComponent(param) : param);
        }
        else {
            for (var i in param) {
                if ((param[i] && param[i] !== '') || param[i] === 0) {
                    var k = !key ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                    paramStr += this.urlEncode(param[i], k, encode);
                }
            }
        }
        return paramStr;
    };
    RequestService.prototype.getActivities = function (params) {
        var query = this.urlEncode(params) || '';
        return this.http[server_config_1.Api.activity.method](server_config_1.Api.activity.url + '?' + query)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RequestService.prototype.addActivity = function (params) {
        return this.http[server_config_1.Api.addActivity.method](server_config_1.Api.addActivity.url, JSON.stringify(params), this.requestOptions)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RequestService.prototype.modifyActivity = function (params) {
        return this.http[server_config_1.Api.modifyActivity.method](server_config_1.Api.modifyActivity.url, JSON.stringify(params), this.requestOptions)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RequestService.prototype.getCouponsTmp = function (params) {
        var query = this.urlEncode(params) || '';
        return this.http[server_config_1.Api.couponTemplate.method](server_config_1.Api.couponTemplate.url + '?' + query)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RequestService.prototype.addCouponTmp = function (params) {
        return this.http[server_config_1.Api.addCouponTemplate.method](server_config_1.Api.addCouponTemplate.url, JSON.stringify(params), this.requestOptions)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RequestService.prototype.modifyCouponTmp = function (params) {
        return this.http[server_config_1.Api.modifyCouponTemplate.method](server_config_1.Api.modifyCouponTemplate.url, JSON.stringify(params), this.requestOptions)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RequestService.prototype.grantCoupons = function (params) {
        return this.http[server_config_1.Api.grantCoupons.method](server_config_1.Api.grantCoupons.url, JSON.stringify(params), this.requestOptions)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RequestService.prototype.getCoupons = function (params) {
        var query = this.urlEncode(params) || '';
        return this.http[server_config_1.Api.couponUse.method](server_config_1.Api.couponUse.url + '?' + query)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RequestService.prototype.modifyCoupon = function (params) {
        return this.http[server_config_1.Api.modifyCoupon.method](server_config_1.Api.modifyCoupon.url, JSON.stringify(params), this.requestOptions)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RequestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RequestService);
    return RequestService;
}());
exports.RequestService = RequestService;
//# sourceMappingURL=request.js.map