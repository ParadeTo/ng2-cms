import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CookieService } from '../../../service/cookie';
@Component({
	moduleId: module.id,
	providers: [CookieService],
	selector: 'login-control-cmp',
	directives: [ROUTER_DIRECTIVES],
	template: '<span></span>'
})

export class LoginControl {
	constructor (
    private _cookieService:CookieService,
		private router:Router
	) {
    let c = this._cookieService.getCookie('test2');
    if (!c) {
      this.router.navigate(['/']);
    }
	}
}
