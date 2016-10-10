import { Component, ViewChild } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';
import { WeixinComponent } from './weixin/weixin';
import { LogisticsComponent } from './logistics/logistics';
import { MsgComponent } from './msg/msg';
import { ManualComponent } from './manual/manual';
import { ToastComponent } from '../../common/toast/index';
import { ExchangeDict,StatusList } from '../../../config/server.config';

@Component({
  moduleId: module.id,
  selector: 'modal-cmp',
  templateUrl: 'modal.html',
  directives: [ToastComponent,MODAL_DIRECTVES, CORE_DIRECTIVES, ManualComponent, WeixinComponent, LogisticsComponent, MsgComponent],
  viewProviders: [BS_VIEW_PROVIDERS],
  exportAs: 'modal',
  styleUrls: ['modal.css']
})

export class ModalComponent {
  StatusList = StatusList;
  ExchangeDict = ExchangeDict;
  private typeText: any;
  private type: any;
  private coupon: any;
  private statusList: any;
  @ViewChild('lgModal') lgModal: any;

  constructor () {
    this.statusList = this.StatusList.slice(1);
  }

  /**
   * 显示对话框
   * @param {string} 兑换类型
   * @param {any} 券实例
   */
  show(type: string,coupon:any) {
    this.coupon = coupon;
		this.type = type;
    this.typeText = this.ExchangeDict[type];
    this.lgModal.show();
  }

  onSuccess() {
    this.lgModal.hide();
  }
}
