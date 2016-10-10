import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'my-date-picker-cmp',
  styleUrls: ['index.css'],
  exportAs: 'datePicker',
  directives: [DATEPICKER_DIRECTIVES],
  templateUrl: 'index.html'
})

export class MyDatePickerComponent {
  public dt: Date = null;
  // public maxDate: Date = new Date();
  @Input('hide') public hide = true;
  @Input('minDate') public minDate : Date;
  @Input('maxDate') public maxDate : Date;
  @ViewChild('container') public container: any;

  constructor(
    private elementRef: ElementRef
  ) {
    document.addEventListener('click', this.offClickHandler.bind(this));
    // 在日期选择控件上点击阻止冒泡
    this.elementRef.nativeElement.addEventListener('click',function(e:any) {
      e.stopPropagation();
    });
  }

  public getDate(): number {
    return this.dt && this.dt.getTime() || null;
  }
  public setDate(ms) {
    this.dt = new Date(ms);
  }
  public today(): void {
    this.dt = new Date();
  }
  public clear() {
    this.dt = null;
    this.hide = true;
  }
  public show() {
    this.hide = false;
  }

  offClickHandler(event: any) {
    // 点击在时间选择控件外且不是点击在其兄弟input节点上则隐藏
    if (!this.container.nativeElement.contains(event.target) &&
      this.elementRef.nativeElement.parentNode.getElementsByTagName('input')[0]!==(event.target)
    ) {
      this.hide = true;
    }
  }
}
