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
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ToastComponent = (function () {
    function ToastComponent() {
        this._show = false;
    }
    ToastComponent.prototype.show = function (title, content, fn) {
        var _this = this;
        this._show = true;
        this.title = title;
        this.content = content;
        this.smModal.show();
        setTimeout(function () {
            if (typeof fn === 'function') {
                fn();
            }
            _this.smModal.hide();
            _this._show = false;
        }, 2000);
    };
    __decorate([
        core_1.ViewChild('smModal'), 
        __metadata('design:type', Object)
    ], ToastComponent.prototype, "smModal", void 0);
    ToastComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'toast-cmp',
            styleUrls: ['index.css'],
            exportAs: 'toast',
            directives: [ng2_bootstrap_1.MODAL_DIRECTVES],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            templateUrl: 'index.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ToastComponent);
    return ToastComponent;
}());
exports.ToastComponent = ToastComponent;
//# sourceMappingURL=index.js.map