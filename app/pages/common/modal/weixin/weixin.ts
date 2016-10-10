import { Component,Input,ViewChild,Output,EventEmitter } from '@angular/core';
import { MyDropDownComponent } from '../../../common/my-drop-down/my-drop-down';
import { RequestService } from '../../../../service/request';

@Component({
  moduleId: module.id,
  selector: 'weixin-cmp',
  templateUrl: 'weixin.html',
  providers: [RequestService],
	directives: [MyDropDownComponent],
  styleUrls: ['../modal.css']
})


export class WeixinComponent {

  @Input('coupon') private coupon:any;
  @ViewChild('status') private status:any;
  @Input('toast') private toast:any;
  @Input('StatusList') private StatusList:any;
  @Input('ExchangeDict') private ExchangeDict:any;
  @Output('success') success = new EventEmitter();

  constructor (private requestService:RequestService) {
     // this.StatusList.splice(0,1);
  }

  onSubmit () {
    this.requestService.modifyCoupon({
      rewardUseId:this.coupon.rewardUseId,
      status: parseInt(this.status.getId())
    })
      .subscribe(
            (data: any) => {
              if (data.code === 0) {
                var me = this;
                this.toast.show('提示','操作成功',function(){
                  // 更新列表中的状态
                  me.coupon.status = parseInt(me.status.getId());
                  me.coupon.statusClassName = 'change';
                  // 发送关闭对话框的消息到父组件
                  me.success.emit({code:0});
                });
              } else {
                this.toast.show('提示',data.desc);
              }
            },
            (err:any) => {
              // Log errors if any
              console.log(err);
              this.toast.show('提示','请求错误');
          });
  }
}
