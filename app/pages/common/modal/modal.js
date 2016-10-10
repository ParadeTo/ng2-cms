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
var common_1 = require('@angular/common');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var weixin_1 = require('./weixin/weixin');
var logistics_1 = require('./logistics/logistics');
var msg_1 = require('./msg/msg');
var manual_1 = require('./manual/manual');
var index_1 = require('../../common/toast/index');
var server_config_1 = require('../../../config/server.config');
var ModalComponent = (function () {
    function ModalComponent() {
        this.StatusList = server_config_1.StatusList;
        this.ExchangeDict = server_config_1.ExchangeDict;
        this.statusList = this.StatusList.slice(1);
    }
    ModalComponent.prototype.show = function (type, coupon) {
        this.coupon = coupon;
        this.type = type;
        this.typeText = this.ExchangeDict[type];
        this.lgModal.show();
    };
    ModalComponent.prototype.onSuccess = function () {
        this.lgModal.hide();
    };
    __decorate([
        core_1.ViewChild('lgModal'), 
        __metadata('design:type', Object)
    ], ModalComponent.prototype, "lgModal", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'modal-cmp',
            templateUrl: 'modal.html',
            directives: [index_1.ToastComponent, ng2_bootstrap_1.MODAL_DIRECTVES, common_1.CORE_DIRECTIVES, manual_1.ManualComponent, weixin_1.WeixinComponent, logistics_1.LogisticsComponent, msg_1.MsgComponent],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            exportAs: 'modal',
            styleUrls: ['modal.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.js.map