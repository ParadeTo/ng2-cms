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
var router_1 = require('@angular/router');
var cookie_1 = require('../../../service/cookie');
var LoginControl = (function () {
    function LoginControl(_cookieService, router) {
        this._cookieService = _cookieService;
        this.router = router;
        var c = this._cookieService.getCookie('test2');
        if (!c) {
            this.router.navigate(['/']);
        }
    }
    LoginControl = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [cookie_1.CookieService],
            selector: 'login-control-cmp',
            directives: [router_1.ROUTER_DIRECTIVES],
            template: '<span></span>'
        }), 
        __metadata('design:paramtypes', [cookie_1.CookieService, router_1.Router])
    ], LoginControl);
    return LoginControl;
}());
exports.LoginControl = LoginControl;
//# sourceMappingURL=login-control.js.map