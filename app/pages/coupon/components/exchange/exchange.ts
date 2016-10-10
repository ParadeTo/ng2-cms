import { Component,ViewChild } from '@angular/core';
import { FormBuilder,Validators } from '@angular/common';
import { PageHead } from '../../../common/page-head/page-head';
import { DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES,TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalComponent } from '../../../common/modal/modal';
import { MyDropDownComponent } from '../../../common/my-drop-down/my-drop-down';
import { CouponDict,ExchangeDict,StatusDict,StatusList,Conf } from '../../../../config/server.config';
import { RequestService } from '../../../../service/request';

@Component({
  moduleId: module.id,
  selector: 'exchange-cmp',
  templateUrl: 'exchange.html',
  styleUrls: ['exchange.css'],
  providers: [RequestService],
  directives: [PageHead, ModalComponent, MyDropDownComponent, DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES,TOOLTIP_DIRECTIVES]
})

export class ExchangeComponent {
  CouponDict = CouponDict;
  ExchangeDict = ExchangeDict;
  StatusList = StatusList;
  StatusDict = StatusDict;
  // 表单校验和control
  public searchForm: any;
  public couponTempId: any;
  public couponId: any;
  public userId: any;
  public userTel: any;
  // 券列表
  public coupons:any = [];
  // 分页
  public totalItems: number;
  public currentPage: number;
  public itemsPerPage = Conf.itemsPerPage;
  public maxSize: number = Conf.maxPages;

  // 查询参数
  private searchParams: any = {
    status: null,
    couponTemplateId: null,
    couponItemId: null,
    userId: null,
    phonenum: null,
    index:0,
  };

  @ViewChild('status') status: any;

  // 是否在查询中
  private submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService
  ) {
    this.searchForm = this.formBuilder.group({
      couponTempId:['',Validators.pattern('[0-9]{1,10}')],
      couponId:['',Validators.pattern('[0-9]{1,10}')],
      userId:['',Validators.pattern('[0-9]{1,10}')],
      userTel:['',Validators.pattern('[0-9]{11}')],
    });
    this.couponTempId = this.searchForm.controls['couponTempId'];
    this.couponId = this.searchForm.controls['couponId'];
    this.userId = this.searchForm.controls['userId'];
    this.userTel = this.searchForm.controls['userTel'];
  }

  // 券列表
  getCoupons(options:any) {
      this.submitting = true;
    options.size = this.itemsPerPage;
    this.requestService.getCoupons(options)
      .subscribe(
        (data: any) => {
          this.submitting = false;
          if (data.code === 0) {
            this.coupons = data.result.list;
            this.totalItems = data.result.totalCount;
          }
        },
        (err:any) => {
          this.submitting = true;
          console.log(err);
      });
  }

  ngOnInit() {
    this.getCoupons(this.searchParams);
  }

  public pageChanged(event: any): void {
    this.searchParams.index = this.itemsPerPage*(event.page-1);
    this.getCoupons(this.searchParams);
  }

  search () {
    this.currentPage = 1;
    this.searchParams.status = this.status.getId() === '-1' ? null : this.status.getId();
    this.searchParams.index = 0;
    this.getCoupons(this.searchParams);
  }
}
