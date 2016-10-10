import { Component,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder,Validators } from '@angular/common';
import { PageHead } from '../../../common/page-head/page-head';
import { UploadService } from '../../../../service/upload';
import { RequestService } from '../../../../service/request';
import { ValidatorService } from '../../../../service/validator';
import { Api,TemplateUrl } from '../../../../config/server.config';
import { ToastComponent } from '../../../common/toast/index';

@Component({
  moduleId: module.id,
  selector: 'grant-cmp',
  templateUrl: 'grant.html',
  styleUrls: ['grant.css'],
  providers: [UploadService,RequestService],
  directives: [PageHead,ToastComponent]
})


export class GrantComponent {
  // 表单及控件
  private grantForm: any;
  private couponTempId: any;
  private activityId: any;
  // 提交对象
  private grant: any = {
    couponTemplateId:null,
    activeId:null,
    fileUrl:null,
    desc:null
  };
  // 进度条值
  private proValue = 0;
  // 正在提交
  private submitting = false;
  // 是否成功上传了id名单
  private isUploadIds = false;
  // 是否显示上传图片失败的提示
  private showUploadErr = false;
  // 模板下载地址
  private TemplateUrl = TemplateUrl;
  // 发放成功的条数
  private successNum = -1;
  // 文件校验返回结果
  private fileCheckRes = null;

  @ViewChild('toast') toast:any;

  constructor(
    public formBuilder: FormBuilder,
    public http: Http,
    public uploadService: UploadService,
    public requestService: RequestService
    ) {
    // 表单
    this.grantForm = this.formBuilder.group({
      couponTempId:['', Validators.compose([Validators.required,Validators.pattern('[0-9]{1,10}')])],
      activityId:['',Validators.compose([Validators.required,Validators.pattern('[0-9]{1,10}')])]
    });
    this.couponTempId = this.grantForm.controls['couponTempId'];
    this.activityId = this.grantForm.controls['activityId'];
    // 上传文件进度条
    this.uploadService.progress$.subscribe(
      (data: any) => {
        this.proValue = data;
      });
  }

  // 上传文件
  uploadFile(event: any) {
    var files = event.srcElement.files;
    this.fileCheckRes = ValidatorService.checkUserIdTemp(files[0]);
    if (this.fileCheckRes.type === 'ok') {
      this.proValue = 0;
      this.uploadService.makeFileRequest(Api.uploadUserFile.url, [], 'userFile', files).subscribe((rep) => {
        if (rep.code === 0) {
          this.grant.fileUrl = rep.result;
        } else {
          this.fileCheckRes = {type:'err',err:rep.desc};
        }
        event.srcElement.value = null;
      },(err:any) => {
        this.fileCheckRes = {type:'err',err:'上传失败！'};
        event.srcElement.value = null;
      });
    }
  }

  // 提交表单
  onSubmit () {
    this.submitting = true;
    this.grant.couponTemplateId = parseInt(this.grant.couponTemplateId);
    this.grant.activeId = parseInt(this.grant.activeId);

    this.requestService.grantCoupons(this.grant)
      .subscribe(
        (data: any) => {
          this.submitting = false;
          if (data.code === 0) {
            this.toast.show('提示','券发放成功',function() {
              location.reload();
            });
            this.successNum = data.result.total;
          }
        },
        (err:any) => {
          this.submitting = false;
          console.log(err);
      });
  }
}
