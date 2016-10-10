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
var MyDatePickerComponent = (function () {
    function MyDatePickerComponent(elementRef) {
        this.elementRef = elementRef;
        this.dt = null;
        this.maxDate = new Date();
        this.hide = true;
        document.addEventListener('click', this.offClickHandler.bind(this));
        this.elementRef.nativeElement.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
    MyDatePickerComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || null;
    };
    MyDatePickerComponent.prototype.setDate = function (ms) {
        this.dt = new Date(ms);
    };
    MyDatePickerComponent.prototype.today = function () {
        this.dt = new Date();
    };
    MyDatePickerComponent.prototype.clear = function () {
        this.dt = null;
        this.hide = true;
    };
    MyDatePickerComponent.prototype.show = function () {
        this.hide = false;
    };
    MyDatePickerComponent.prototype.offClickHandler = function (event) {
        if (!this.container.nativeElement.contains(event.target) &&
            this.elementRef.nativeElement.parentNode.getElementsByTagName('input')[0] !== (event.target)) {
            this.hide = true;
        }
    };
    __decorate([
        core_1.Input('hide'), 
        __metadata('design:type', Object)
    ], MyDatePickerComponent.prototype, "hide", void 0);
    __decorate([
        core_1.Input('minDate'), 
        __metadata('design:type', Date)
    ], MyDatePickerComponent.prototype, "minDate", void 0);
    __decorate([
        core_1.ViewChild('container'), 
        __metadata('design:type', Object)
    ], MyDatePickerComponent.prototype, "container", void 0);
    MyDatePickerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-date-picker-cmp',
            styleUrls: ['index.css'],
            exportAs: 'datePicker',
            directives: [ng2_bootstrap_1.DATEPICKER_DIRECTIVES],
            templateUrl: 'index.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MyDatePickerComponent);
    return MyDatePickerComponent;
}());
exports.MyDatePickerComponent = MyDatePickerComponent;
//# sourceMappingURL=index.js.map