import {Component, ViewEncapsulation} from '@angular/core';
import { ROUTER_DIRECTIVES,Router } from '@angular/router';
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { CookieService } from '../../service/cookie';

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
    encapsulation: ViewEncapsulation.None,
    directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class TopNavComponent {
	constructor (
		private _cookieService:CookieService,
		private router:Router
	) {
		// 已登录，直接跳转
		// if(this._cookieService.getCookie(COOKIE_NAME)) {
		// 	this.router.navigate(['/dashboard','/coupon','/search']);
		// }
	}
	logout () {

	}
}
