/**
https://auth0.com/blog/angular-2-series-part-5-forms-and-custom-validation/
**/
import { Component,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder,Validators } from '@angular/common';
import { ROUTER_DIRECTIVES, RouteSegment,Router } from '@angular/router';
import { PageHead } from '../../../common/page-head/page-head';
import { MyDropDownComponent } from '../../../common/my-drop-down/my-drop-down';
import { MyDatePickerComponent } from '../../../common/my-date-picker/index';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { UploadService } from '../../../../service/upload';
import { RequestService } from '../../../../service/request';
import { ValidatorService } from '../../../../service/validator';
import { ToastComponent } from '../../../common/toast/index';
import { Api,CouponDict,ExchangeDict,CouponList,ExchangeList,TimeList,InvestList } from '../../../../config/server.config';

@Component({
  moduleId: module.id,
  selector: 'add-cmp',
  templateUrl: 'add.html',
  styleUrls: ['add.css'],
	providers: [UploadService, RequestService],
  directives: [ToastComponent,PageHead, DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES, MyDropDownComponent, MyDatePickerComponent]
})


export class AddComponent {
  CouponDict = CouponDict;
  ExchangeDict = ExchangeDict;
  CouponList = CouponList;
  ExchangeList = ExchangeList;
  TimeList = TimeList;
  InvestList = InvestList;

  private id:any;
  private title:any = '增加券模板';
  // 表单及控件
  private addCouponForm: any;
  // private couponDisplayId: any;
  private couponName: any;
  private validDays: any;
  private investAmountLimit: any;
  private investDurationLimit: any;
  private par: any;

  // 图片校验返回结果
  private imgCheckRes = null;

  // 占位图片
  private imgPlaceHolder = 'assets/img/img-placeholder.png';

  // 提交对象
  private coupon: any = {
    couponDisplayId:1,
    couponId:1,
    couponName:'',
    couponType:null,
    exchangeType:null,
    gmtCreate:1,
    gmtModified:1,
    iconUrl: this.imgPlaceHolder,
    investAmountLimit:null,
    investDurationLimit:null,
    investTargetType:0,
    investType:null,
    par:null,
    status:1,
    useDesc:'',
    validDays:null
  };
  // 进度条值
  private proValue = 0;
  // 正在提交
  private submitting = false;
  // 下拉列表
  @ViewChild('couponType') private couponType: any;
  @ViewChild('exchangeType') private exchangeType: any;
  @ViewChild('investType') private investType: any;
  private selectCouponId = this.CouponList[0].id;
  private selectExchangeId = this.ExchangeList[0].id;
  private selectInvestId = this.InvestList[0].id;
  // 禁止修改
  private isDisabled = false;

  @ViewChild('toast') toast:any;

  constructor(
    public formBuilder: FormBuilder,
    public http: Http,
    public uploadService: UploadService,
    public requestService: RequestService,
    public routeSegment: RouteSegment,
    public router: Router
  ) {
    // 表单
    this.addCouponForm = this.formBuilder.group({
      // couponDisplayId:['', Validators.required],
      couponName:['',Validators.compose([Validators.required,Validators.maxLength(20)])],
      investAmountLimit:['',Validators.required],
      investDurationLimit:['',Validators.compose([Validators.required,Validators.pattern('[0-9]{1,3}')])],
      par:['',Validators.compose([Validators.required,Validators.pattern('[0-9]{1,4}')])],
      validDays:['',Validators.compose([Validators.required,Validators.pattern('[0-9]{1,4}')])]
    });
    // delete this.addCouponForm.controls['test'];
    // this.addCouponForm.controls['test'] = new Control('', Validators.required);

    // this.couponDisplayId = this.addCouponForm.controls['couponDisplayId'];
    this.couponName = this.addCouponForm.controls['couponName'];
    this.investAmountLimit = this.addCouponForm.controls['investAmountLimit'];
    this.investDurationLimit = this.addCouponForm.controls['investDurationLimit'];
    this.validDays = this.addCouponForm.controls['validDays'];
    this.par = this.addCouponForm.controls['par'];

    // 上传图片进度条
    this.uploadService.progress$.subscribe(
      (data: any) => {
	       this.proValue = data;
      });
  }

  ngOnInit () {
    this.id = this.routeSegment.getParam('id');
    if (this.id) {
      this.isDisabled = true;
      this.title = '修改券模板';
      this.imgCheckRes = {type:'ok'};
      this.requestService.getCouponsTmp({id:this.id})
        .subscribe(
          (data: any) => {
            if (data.code === 0) {
              this.coupon.couponDisplayId = data.result.list[0].couponDisplayId;
              this.coupon.couponName = data.result.list[0].couponName;
              
              // 下拉，选中当前值
              this.coupon.couponType = data.result.list[0].couponType;
              this.coupon.exchangeType = data.result.list[0].exchangeType;
              this.coupon.investType = data.result.list[0].inverstType;
              this.selectCouponId = data.result.list[0].couponType;
              this.selectExchangeId = data.result.list[0].exchangeType;
              this.selectInvestId = data.result.list[0].investType;

              this.coupon.iconUrl = data.result.list[0].iconUrl;
              this.coupon.investAmountLimit = data.result.list[0].investAmountLimit;
              this.coupon.investDurationLimit = data.result.list[0].investDurationLimit;
              this.coupon.par = data.result.list[0].par;
              this.coupon.validDays = data.result.list[0].validDays;
              this.coupon.useDesc = data.result.list[0].useDesc;
            }
          },
          (err:any) => {
            // Log errors if any
            console.log(err);
        });
    }
  }

  // 选择兑换方式
  changeExchangeType(id: number,text: string) {
    this.coupon.exchangeTypeText = text;
    this.coupon.exchangeTypeId = id;
  }

  // 上传图片
  uploadImg(event: any) {
    this.coupon.iconUrl = this.imgPlaceHolder;
    this.proValue = 0;
    var files = event.srcElement.files;
    this.imgCheckRes = ValidatorService.checkImg(files[0]);
    if (this.imgCheckRes.type === 'ok') {
      this.uploadService.makeFileRequest(Api.uploadImg.url, [], 'img', files).subscribe((res) => {
        if (res.code === 0) {
          this.coupon.iconUrl = res.result;
        } else {
          this.imgCheckRes = {type:'err',err:res.desc};
        }
        event.srcElement.value = null;
      },(err) => {
        this.imgCheckRes = {type:'err',err:'上传失败！'};
        event.srcElement.value = null;
      });
    }
  }

  // 提交表单
  onSubmit () {
    if(this.id || this.id === 0) {
      this.coupon.couponId = this.id;
      this.coupon.investType = this.investType.getId();
      this.requestService.modifyCouponTmp(this.coupon)
        .subscribe(
          (data: any) => {
            this.submitting = false;
            if (data.code === 0) {

              this.toast.show('提示','券模板修改成功',() => {
                location.reload();
                                      // location.hash = '/dashboard/coupon/search';
                // this.router.navigate(['/dashboard','/coupon','/add']);
                // TODO
                // this.router.navigate(['/dashboard','/coupon','/search']);
              });
            }
          },
          (err:any) => {
            this.submitting = false;
            console.log(err);
          });
    } else {
      this.coupon.couponType = this.couponType.getId();
      this.coupon.exchangeType = this.exchangeType.getId();
      this.coupon.investType = this.investType.getId();

      this.requestService.addCouponTmp(this.coupon)
        .subscribe(
          (data: any) => {
            this.submitting = false;
            if (data.code === 0) {
              this.toast.show('提示','券模板增加成功',() => {
                location.reload(); 
                                      // location.hash = '/dashboard/coupon/search';
              });
            }
          },
          (err:any) => {
            this.submitting = false;
            console.log(err);
          });
    }
  }

  // 改变券类型时
  onCouponTypeChange (e:any) {
    console.log(e);
  }

  // 改变兑换方式时
  onExchangeTypeChange (e:any) {
    console.log(e);
  }
}
