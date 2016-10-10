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
var my_drop_down_1 = require('../../../common/my-drop-down/my-drop-down');
var request_1 = require('../../../../service/request');
var WeixinComponent = (function () {
    function WeixinComponent(requestService) {
        this.requestService = requestService;
        this.success = new core_1.EventEmitter();
    }
    WeixinComponent.prototype.onSubmit = function () {
        var _this = this;
        this.requestService.modifyCoupon({
            rewardUseId: this.coupon.rewardUseId,
            status: parseInt(this.status.getId())
        })
            .subscribe(function (data) {
            if (data.code === 0) {
                var me = _this;
                _this.toast.show('提示', '操作成功', function () {
                    me.coupon.status = parseInt(me.status.getId());
                    me.coupon.statusClassName = 'change';
                    me.success.emit({ code: 0 });
                });
            }
            else {
                _this.toast.show('提示', data.desc);
            }
        }, function (err) {
            console.log(err);
            _this.toast.show('提示', '请求错误');
        });
    };
    __decorate([
        core_1.Input('coupon'), 
        __metadata('design:type', Object)
    ], WeixinComponent.prototype, "coupon", void 0);
    __decorate([
        core_1.ViewChild('status'), 
        __metadata('design:type', Object)
    ], WeixinComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input('toast'), 
        __metadata('design:type', Object)
    ], WeixinComponent.prototype, "toast", void 0);
    __decorate([
        core_1.Input('StatusList'), 
        __metadata('design:type', Object)
    ], WeixinComponent.prototype, "StatusList", void 0);
    __decorate([
        core_1.Input('ExchangeDict'), 
        __metadata('design:type', Object)
    ], WeixinComponent.prototype, "ExchangeDict", void 0);
    __decorate([
        core_1.Output('success'), 
        __metadata('design:type', Object)
    ], WeixinComponent.prototype, "success", void 0);
    WeixinComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'weixin-cmp',
            templateUrl: 'weixin.html',
            providers: [request_1.RequestService],
            directives: [my_drop_down_1.MyDropDownComponent],
            styleUrls: ['../modal.css']
        }), 
        __metadata('design:paramtypes', [request_1.RequestService])
    ], WeixinComponent);
    return WeixinComponent;
}());
exports.WeixinComponent = WeixinComponent;
//# sourceMappingURL=weixin.js.map