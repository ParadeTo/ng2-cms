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
var page_head_1 = require('../../../common/page-head/page-head');
var my_drop_down_1 = require('../../../common/my-drop-down/my-drop-down');
var index_1 = require('../../../common/my-date-picker/index');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var router_1 = require('@angular/router');
var server_config_1 = require('../../../../config/server.config');
var request_1 = require('../../../../service/request');
var SearchComponent = (function () {
    function SearchComponent(requestService) {
        this.requestService = requestService;
        this.CouponDict = server_config_1.CouponDict;
        this.ExchangeDict = server_config_1.ExchangeDict;
        this.CouponList = server_config_1.CouponList;
        this.startDate1 = new Date(1990, 0, 1);
        this.startDate2 = new Date(1990, 0, 1);
        this.couponTmpList = [];
        this.itemsPerPage = server_config_1.Conf.itemsPerPage;
        this.maxSize = server_config_1.Conf.maxPages;
        this.searchParams = {
            type: null,
            id: null,
            firstTime: null,
            lastTime: null,
            index: 0
        };
    }
    SearchComponent.prototype.getCouponsTmp = function (options) {
        var _this = this;
        options.size = this.itemsPerPage;
        this.requestService.getCouponsTmp(options)
            .subscribe(function (data) {
            if (data.code === 0) {
                _this.couponTmpList = data.result.list;
                _this.totalItems = data.result.totalCount;
            }
        }, function (err) {
            console.log(err);
        });
    };
    SearchComponent.prototype.ngOnInit = function () {
        this.getCouponsTmp(this.searchParams);
    };
    SearchComponent.prototype.pageChanged = function (event) {
        this.searchParams.index = this.itemsPerPage * (event.page - 1);
        this.currentPage = event.page;
        this.getCouponsTmp(this.searchParams);
    };
    SearchComponent.prototype.showDatePicker1 = function (e) {
        this.d1.show();
    };
    SearchComponent.prototype.showDatePicker2 = function (e) {
        this.d2.show();
    };
    SearchComponent.prototype.getFirstTime = function () {
        this.searchParams.firstTime = this.d1.getDate();
    };
    SearchComponent.prototype.getLastTime = function (event) {
        this.searchParams.lastTime = this.d2.getDate();
    };
    SearchComponent.prototype.search = function (e) {
        this.searchParams.firstTime = this.d1.getDate();
        this.searchParams.lastTime = this.d2.getDate();
        this.searchParams.type = this.myDropDown.getId();
        this.searchParams.index = 0;
        this.getCouponsTmp(this.searchParams);
    };
    __decorate([
        core_1.ViewChild('d1'), 
        __metadata('design:type', Object)
    ], SearchComponent.prototype, "d1", void 0);
    __decorate([
        core_1.ViewChild('d2'), 
        __metadata('design:type', Object)
    ], SearchComponent.prototype, "d2", void 0);
    __decorate([
        core_1.ViewChild('myDropDown'), 
        __metadata('design:type', Object)
    ], SearchComponent.prototype, "myDropDown", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'search-cmp',
            templateUrl: 'search.html',
            styleUrls: ['search.css'],
            providers: [request_1.RequestService],
            directives: [page_head_1.PageHead,
                ng2_bootstrap_1.DATEPICKER_DIRECTIVES,
                router_1.ROUTER_DIRECTIVES,
                index_1.MyDatePickerComponent,
                ng2_bootstrap_1.PAGINATION_DIRECTIVES,
                my_drop_down_1.MyDropDownComponent]
        }), 
        __metadata('design:paramtypes', [request_1.RequestService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.js.map