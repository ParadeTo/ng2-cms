import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CookieService } from '../../../service/cookie';
import { COOKIE_NAME,Account } from '../../../config/server.config';


@Component({
	selector : 'login-cmp',
	templateUrl : './pages/login/components/login.html',
	providers: [CookieService],
	directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent {
	private username:any;
	private password:any;
	private loginError = false;
	constructor (
		private _cookieService:CookieService,
		private router:Router
	) {
		// 已登录，直接跳转
		if(this._cookieService.getCookie(COOKIE_NAME)) {
			this.router.navigate(['/dashboard','/coupon','/search']);
		}
	}
	login() {
		if (Account.username === this.username && Account.password === this.password) {
			// 3小时有效
			this._cookieService.setCookie(COOKIE_NAME,'1',0.125,'/');
			// location.hash = '/dashboard/coupon/search';
			this.router.navigate(['/dashboard','/coupon','/search']);
		}  else {
			this.loginError = true;
		}
	}
	focus () {
		this.loginError = false;
	}
}
