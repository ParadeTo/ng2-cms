import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {FormBuilder,Validators} from '@angular/common';
import {PageHead} from '../../../common/page-head/page-head';
import {UploadService} from '../../../../service/upload';

@Component({
  moduleId: module.id,
  selector: 'grant-cash-cmp',
	providers: [UploadService],
  styleUrls: ['index.css'],
  directives: [PageHead],
  templateUrl: 'index.html',
})

export class GrantCashComponent {
  // 表单及控件
  private rewardForm: any;
  private sum: any;
  private activityId: any;
  // 提交对象
  private reward: any = {
    sum:'',
    activityId:'',
    remark:''
  };
  // 进度条值
  private proValue = 0;
  // 正在提交
  private submitting = false;
  constructor(
    public formBuilder: FormBuilder,
    public http: Http,
    public uploadService: UploadService
  ) {
    // 表单
    this.rewardForm = this.formBuilder.group({
      sum:['', Validators.required],
      activityId:['',Validators.required]
    });
    this.sum = this.rewardForm.controls['sum'];
    this.activityId = this.rewardForm.controls['activityId'];
    // 上传文件进度条
    this.uploadService.progress$.subscribe(
      (data: any) => {
         this.proValue = data;
      });
  }
}
