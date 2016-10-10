import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';


@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html',
	directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class SidebarComponent {
	isActive = false;
	_showCouponMenu: boolean = false;
	_showRewardMenu: boolean = false;
	_showActivityMenu: boolean = false;
	eventCalled() {
		this.isActive = !this.isActive;
	}
	showCouponMenu () {
		this._showCouponMenu = !this._showCouponMenu;
	}
	showRewardMenu () {
		this._showRewardMenu = !this._showRewardMenu;
	}
	showActivityMenu () {
		this._showActivityMenu = !this._showActivityMenu;
	}
}
