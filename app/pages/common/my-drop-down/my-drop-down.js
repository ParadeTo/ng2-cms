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
var MyDropDownComponent = (function () {
    function MyDropDownComponent() {
        this.selectChange = new core_1.EventEmitter();
        this.text = '';
    }
    MyDropDownComponent.prototype.ngOnChanges = function () {
        if (this.selectId || (this.selectId !== undefined && this.selectId.toString() === '0')) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id.toString() === this.selectId.toString()) {
                    this.text = this.list[i].text;
                    this.id = this.list[0].id;
                }
            }
        }
    };
    MyDropDownComponent.prototype.getId = function () {
        return this.id;
    };
    MyDropDownComponent.prototype.changeSelect = function (id, text, i) {
        this.text = text;
        this.id = id;
        this.selectChange.emit({ id: id, text: text, index: i });
    };
    __decorate([
        core_1.Input('selectId'), 
        __metadata('design:type', Object)
    ], MyDropDownComponent.prototype, "selectId", void 0);
    __decorate([
        core_1.Input('list'), 
        __metadata('design:type', Object)
    ], MyDropDownComponent.prototype, "list", void 0);
    __decorate([
        core_1.Output('selectChange'), 
        __metadata('design:type', Object)
    ], MyDropDownComponent.prototype, "selectChange", void 0);
    __decorate([
        core_1.Input('isDisabled'), 
        __metadata('design:type', Boolean)
    ], MyDropDownComponent.prototype, "isDisabled", void 0);
    MyDropDownComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-drop-down-cmp',
            templateUrl: 'my-drop-down.html',
            styleUrls: ['my-drop-down.css'],
            directives: [ng2_bootstrap_1.DROPDOWN_DIRECTIVES],
            exportAs: 'myDropDown'
        }), 
        __metadata('design:paramtypes', [])
    ], MyDropDownComponent);
    return MyDropDownComponent;
}());
exports.MyDropDownComponent = MyDropDownComponent;
//# sourceMappingURL=my-drop-down.js.map