import {Component, ViewEncapsulation} from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { SearchComponent } from './search/search';
import { AddComponent } from './add/add';
import { ExchangeComponent } from './exchange/exchange';
import { GrantComponent } from './grant/grant';


@Component({
  moduleId: module.id,
  selector: 'coupon-cmp',
  templateUrl: 'coupon.html',
  styleUrls:['coupon.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})

@Routes([
  { path: '/search', component: SearchComponent },
  { path: '/add/:id', component: AddComponent },
  { path: '/add', component: AddComponent },
  { path: '/exchange', component: ExchangeComponent },
  { path: '/grant', component: GrantComponent },
])

export class CouponComponent {}
