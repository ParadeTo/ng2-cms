"use strict";
var ValidatorService = (function () {
    function ValidatorService() {
    }
    ValidatorService.contains = function (a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    };
    ValidatorService.checkImg = function (file) {
        if (!file) {
            return { type: 'null', err: '请选择图片' };
        }
        var fileLowerPath = file.name.toLowerCase();
        var extension = fileLowerPath.substring(fileLowerPath.lastIndexOf('.') + 1);
        if (!this.contains(this.imgExt, extension)) {
            return { type: 'ext', err: '允许的格式：' + this.imgExt.join(',') };
        }
        var mBytes = file.size / 1024 / 1024;
        if (mBytes > this.imgSize) {
            return { type: 'size', err: '允许的大小：小于等于' + this.imgSize + 'm' };
        }
        return { type: 'ok' };
    };
    ValidatorService.checkUserIdTemp = function (file) {
        if (!file) {
            return { type: 'null', err: '请选择文件' };
        }
        var fileLowerPath = file.name.toLowerCase();
        var extension = fileLowerPath.substring(fileLowerPath.lastIndexOf('.') + 1);
        if (!this.contains(this.userIdTempExt, extension)) {
            return { type: 'ext', err: '允许的格式：' + this.userIdTempExt };
        }
        return { type: 'ok' };
    };
    ValidatorService.imgExt = ['jpg', 'png', 'bmp', 'jpeg'];
    ValidatorService.userIdTempExt = ['xls'];
    ValidatorService.imgSize = 5;
    return ValidatorService;
}());
exports.ValidatorService = ValidatorService;
//# sourceMappingURL=validator.js.map