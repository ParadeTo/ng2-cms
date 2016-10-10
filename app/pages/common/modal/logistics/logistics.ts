import { Component,Input,ViewChild,EventEmitter,Output } from '@angular/core';
import { FormBuilder,Validators } from '@angular/common';
import { MyDropDownComponent } from '../../../common/my-drop-down/my-drop-down';
import { RequestService } from '../../../../service/request';

@Component({
  moduleId: module.id,
  selector: 'logistics-cmp',
  templateUrl: 'logistics.html',
	directives: [MyDropDownComponent],
  styleUrls: ['../modal.css']
})


export class LogisticsComponent {
  @ViewChild('status') private status:any;
  @Input('coupon') private coupon:any;
  @Input('toast') private toast:any;
  @Input('StatusList') private StatusList:any;
  @Input('ExchangeDict') private ExchangeDict:any;
  @Output('success') success = new EventEmitter();
  // 表单提交对象
  private submitObj:any = {
    rewardUseId:null,
    postCompany:null,
    expressNumber:null,
    status:null
  };
  // 表单及控件
  private modalForm: any;
  private postCompany: any;
  private expressNumber: any;

  constructor (
    public formBuilder: FormBuilder,
    public requestService: RequestService
  ) {
    this.modalForm = this.formBuilder.group({
      postCompany:['',Validators.compose([Validators.required,Validators.maxLength(255)])],
      expressNumber:['',Validators.compose([Validators.required,Validators.maxLength(64)])]
    });
    this.postCompany = this.modalForm.controls['postCompany'];
    this.expressNumber = this.modalForm.controls['expressNumber'];
  }

  onSubmit () {
    this.submitObj.status = parseInt(this.status.getId());
    this.submitObj.rewardUseId = this.coupon.rewardUseId;
    this.requestService.modifyCoupon(this.submitObj)
      .subscribe(
            (data: any) => {
              if (data.code === 0) {
                var me = this;
                this.toast.show('提示','操作成功',function(){
                  // 更新列表中的状态
                  me.coupon.status = me.submitObj.status;
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
