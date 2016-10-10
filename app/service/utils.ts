export class UtilsService {

	static randomChar(l: number) {
		var x = '0123456789qwertyuioplkjhgfdsazxcvbnm';
		var tmp = '';
		var timestamp = new Date().getTime();
		for (var i = 0; i < l; i++) {
			tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
		}
		return timestamp+tmp;
	}
}