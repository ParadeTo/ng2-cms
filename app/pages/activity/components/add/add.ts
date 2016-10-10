import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { MyDropDownComponent } from '../../../common/my-drop-down/my-drop-down';
import { MyDatePickerComponent } from '../../../common/my-date-picker/index';
import { ROUTER_DIRECTIVES, RouteSegment } from '@angular/router';
import { FormBuilder, Validators } from '@angular/common';
import { PageHead } from '../../../common/page-head/page-head';
import { RequestService } from '../../../../service/request';
import { UtilsService } from '../../../../service/utils';
import { ToastComponent } from '../../../common/toast/index';

@Component({
  moduleId: module.id,
  selector: 'add-cmp',
  templateUrl: 'add.html',
  styleUrls: ['add.css'],
  providers: [RequestService],
  directives: [PageHead, ROUTER_DIRECTIVES, ToastComponent,MyDropDownComponent, MyDatePickerComponent]
})


export class AddComponent implements OnInit {

  @ViewChild('d1') d1: any;
  @ViewChild('d2') d2: any;
  @ViewChild('status') status: any;
  @ViewChild('toast') toast:any;

  // 状态
  private statusList = [
    {'id':0,'text':'无效'},
    {'id':1,'text':'有效'},
  ]
  // 标题
  private title:any = '新增活动';
  // 活动id，修改时有
  private id: any;
  // 表单及控件
  private addForm: any;
  private name: any;
  // 提交对象
  private activity: any = {
    'activityName': '',
    'des': '',
    'activityBeginTime': 1,
    'activityEndTime': 1,
    'activityStatus': 0,
    'activityCode': 'code'
  };
  // 正在提交
  private submitting = false;
  // 下拉列表选择索引
  private selectedIndex = 0;

  constructor(
    public formBuilder: FormBuilder,
    public http: Http,
    public routeSegment: RouteSegment,
    public requestService: RequestService
  ) {

    // 表单
    this.addForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required,Validators.pattern('[^~!@#$%^&*`]{1,50}')])],
    });
    this.name = this.addForm.controls['name'];
  }

  ngOnInit() {
    this.id = this.routeSegment.getParam('id');
    if (this.id) {
      this.title = '修改活动';
      this.requestService.getActivities({id:this.id})
        .subscribe(
          (data: any) => {
            if (data.code === 0) {
              this.d1.setDate(data.result.list[0].activityBeginTime.time);
              this.d2.setDate(data.result.list[0].activityEndTime.time);
              this.selectedIndex = data.result.list[0].activityStatus;
              this.activity.activityName = data.result.list[0].activityName;
              this.activity.des = data.result.list[0].des;
            }
          },
          (err:any) => {
            // Log errors if any
            console.log(err);
        });
    }
  }

  onSubmit(e: any) {
    this.submitting = true;
    this.activity.activityCode = UtilsService.randomChar(10);
    this.activity.activityStatus = parseInt(this.status.getId());
    this.activity.activityBeginTime = this.d1.getDate();
    this.activity.activityEndTime = this.d2.getDate();
    if (this.id) {

      this.activity.activityId = this.id;
      this.requestService.modifyActivity(this.activity)
        .subscribe(
        (data: any) => {
          this.submitting = false;
          if (data.code === 0) {
              this.toast.show('提示','活动修改成功',function() {
                      location.reload();
                      // location.hash = '/dashboard/activity/search';
              });
          }
        },
        (err: any) => {
          this.submitting = false;
          console.log(err);
        });
    } else {
      this.activity.activityId = 1;
      this.requestService.addActivity(this.activity)
        .subscribe(
        (data: any) => {

          this.submitting = false;
          if (data.code === 0) {
              this.toast.show('提示','活动增加成功',function() {
                      location.reload();
                      // location.hash = '/dashboard/activity/search';
              });
          }
        },
        (err: any) => {
          this.submitting = false;
          console.log(err);
        });
    }
    e.preventDefault();
  }

  showDatePicker1(e: any) {
    this.d1.show();
  }

  showDatePicker2(e: any) {
    this.d2.show();
  }
}
