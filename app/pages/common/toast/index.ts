import { Component, ViewChild } from '@angular/core';
import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'toast-cmp',
  styleUrls: ['index.css'],
  exportAs: 'toast',
  directives: [MODAL_DIRECTVES],
  viewProviders: [BS_VIEW_PROVIDERS],
  templateUrl: 'index.html'
})

export class ToastComponent {
  @ViewChild('smModal') private smModal:any;
  title:any;
  content:any;
  _show = false;
  show (title:any,content:any,fn:any) {
    this._show = true;
    this.title = title;
    this.content = content;
    this.smModal.show();
    setTimeout( () => {
      if (typeof fn === 'function') {
        fn();
      }
      this.smModal.hide();
      this._show = false;
    },2000);
  }
}
