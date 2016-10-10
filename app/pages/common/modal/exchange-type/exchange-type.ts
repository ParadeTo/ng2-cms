import {Component,Input} from '@angular/core';
import {FormBuilder,Validators} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

// 微信
@Component({
  moduleId: module.id,
  selector: 'exchange-type-cmp',
  templateUrl: 'exchange-type.html',
	directives: [DROPDOWN_DIRECTIVES],
  styleUrls: ['exchange-type.css']
})


export class ExchangeTypeComponent {
  // 对话框类型
  @Input('type') private type:any;
  // 表单及控件
  private modalForm: any;
  private modalFormConf: any;
  private express: any;
  private orderNum: any;
  private exchangeNum: any;

  private status = {
    id:0,
    text:'',
  };
  // 正在提交
  // private submitting = false;
  constructor (
    public formBuilder: FormBuilder
  ) {

  }
  // 更改任何输入属性之后调用和在内容处理或者子视图之前调用
  ngOnChanges () {
    if (this.type === 1) {
      this.modalFormConf = {};
    } else if (this.type === 2) {
      this.modalFormConf = {
        express:['',Validators.required],
        orderNum:['',Validators.required]
      };
    } else if (this.type === 3) {
      this.modalFormConf = {
        exchangeNum:['',Validators.required]
      };
    }
    this.modalForm = this.formBuilder.group(this.modalFormConf);
    this.express = this.modalForm.controls['express'];
    this.orderNum = this.modalForm.controls['orderNum'];
    this.exchangeNum = this.modalForm.controls['exchangeNum'];
  }
  changeStatus (id:number,text:string) {
    this.status.id = id;
    this.status.text = text;
  }
}
