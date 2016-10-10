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
var ExchangeTypeComponent = (function () {
    function ExchangeTypeComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.status = {
            id: 0,
            text: '',
        };
    }
    ExchangeTypeComponent.prototype.ngOnChanges = function () {
        if (this.type === 1) {
            this.modalFormConf = {};
        }
        else if (this.type === 2) {
            this.modalFormConf = {
                express: ['', common_1.Validators.required],
                orderNum: ['', common_1.Validators.required]
            };
        }
        else if (this.type === 3) {
            this.modalFormConf = {
                exchangeNum: ['', common_1.Validators.required]
            };
        }
        this.modalForm = this.formBuilder.group(this.modalFormConf);
        this.express = this.modalForm.controls['express'];
        this.orderNum = this.modalForm.controls['orderNum'];
        this.exchangeNum = this.modalForm.controls['exchangeNum'];
    };
    ExchangeTypeComponent.prototype.changeStatus = function (id, text) {
        this.status.id = id;
        this.status.text = text;
    };
    __decorate([
        core_1.Input('type'), 
        __metadata('design:type', Object)
    ], ExchangeTypeComponent.prototype, "type", void 0);
    ExchangeTypeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exchange-type-cmp',
            templateUrl: 'exchange-type.html',
            directives: [ng2_bootstrap_1.DROPDOWN_DIRECTIVES],
            styleUrls: ['exchange-type.css']
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], ExchangeTypeComponent);
    return ExchangeTypeComponent;
}());
exports.ExchangeTypeComponent = ExchangeTypeComponent;
//# sourceMappingURL=exchange-type.js.map