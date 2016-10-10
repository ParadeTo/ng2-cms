import {Component, ViewEncapsulation} from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import {CouponComponent} from '../../../pages/coupon/components/coupon';
import {RewardComponent} from '../../../pages/reward/components/reward';
import {ActivityComponent} from '../../../pages/activity/components/activity';

import {TopNavComponent} from '../../../shared/topnav/topnav';
import {SidebarComponent} from '../../../shared/sidebar/sidebar';

import {CookieService} from '../../../service/cookie';
import {COOKIE_NAME} from '../../../config/server.config';

@Component({
  moduleId: module.id,
  selector: 'dashboard-cmp',
  styles:[`
    .default {
      display:none;
    }
    .default.show {
      display:block;
    }
  `],
  templateUrl: 'dashboard.html',
	providers: [CookieService],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, TopNavComponent, SidebarComponent]
})

@Routes([
  { path: '/coupon', component: CouponComponent },
  { path: '/reward', component: RewardComponent },
  { path: '/activity', component: ActivityComponent }
])

export class DashboardComponent {
  private isLogin: any;

  loginControl (redirectUrl?:string) {
    // 登陆控制
    let c = this._cookieService.getCookie(COOKIE_NAME);
    if (!c) {
      this.isLogin = false;
      window.location.hash = '/login';
    } else {
      this.isLogin = true;
      // if (redirectUrl) {
      //   window.location.hash = redirectUrl;
      // }
    }
  }

  constructor (
    private _cookieService:CookieService,
    private _router: Router
  ) {
    this.isLogin = true;
      // this.loginControl();

    // this._router.changes.subscribe( val => {
    //   this.loginControl();
    // });
  }
}
