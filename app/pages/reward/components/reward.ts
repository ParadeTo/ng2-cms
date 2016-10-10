import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { GrantCashComponent } from './grant-cash/index';

@Component({
  moduleId: module.id,
  selector: 'reward-cmp',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'reward.html',
})

@Routes([
  { path: '/grant-cash', component: GrantCashComponent }
])

export class RewardComponent { }
