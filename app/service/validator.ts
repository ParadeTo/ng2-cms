export class ValidatorService {

	static imgExt = ['jpg','png','bmp','jpeg'];
	static userIdTempExt = ['xls'];
	static imgSize = 5; // 单位为m

	/**
	 * 检查数组中是否含有某元素
	 * @param {any} a   数组
	 * @param {any} obj 元素
	 */
	static contains(a:any, obj:any) {
		for (var i = 0; i < a.length; i++) {
			if (a[i] === obj) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 检查图片
	 * @param  {File}   file 图片文件
	 * @return {Object}      返回错误对象
	 */
	static checkImg(file: File):Object {
		// 校验是否为空
		if (!file) {
			return {type:'null',err:'请选择图片'};
		}
		// 校验后缀
	    // 小写字母的文件路径
	    let fileLowerPath = file.name.toLowerCase();
		// 获取文件的后缀名
		let extension = fileLowerPath.substring(fileLowerPath.lastIndexOf('.') + 1);

		if (!this.contains(this.imgExt,extension)) {
			return {type:'ext',err:'允许的格式：'+this.imgExt.join(',')};
		}

		// 校验大小
		let mBytes = file.size/1024/1024;
		if (mBytes > this.imgSize) {
			return {type:'size',err:'允许的大小：小于等于'+this.imgSize+'m'};
		}
		return {type:'ok'};
	}

	static checkUserIdTemp(file: File):Object {
		// 校验是否为空
		if (!file) {
			return {type:'null',err:'请选择文件'};
		}
		// 校验后缀
	 	// 小写字母的文件路径
	    let fileLowerPath = file.name.toLowerCase();
		// 获取文件的后缀名
		let extension = fileLowerPath.substring(fileLowerPath.lastIndexOf('.') + 1);

		if (!this.contains(this.userIdTempExt,extension)) {
			return {type:'ext',err:'允许的格式：'+this.userIdTempExt.join(',')};
		}
		return {type:'ok'};
	}
}