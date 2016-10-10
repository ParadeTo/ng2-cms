import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import {AddComponent} from './add/add';
import {SearchComponent} from './search/search';

@Component({
  moduleId: module.id,
  selector: 'activity-cmp',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'activity.html',
})

@Routes([
  { path: '/add/:id', component: AddComponent },
  { path: '/add', component: AddComponent },
  { path: '/search', component: SearchComponent }
])

export class ActivityComponent {
 }
