import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/common';
import { PageHead } from '../../../common/page-head/page-head';
import { MyDropDownComponent } from '../../../common/my-drop-down/my-drop-down';
import { MyDatePickerComponent } from '../../../common/my-date-picker/index';
import { DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES,TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CouponDict,ExchangeDict,CouponList,Conf } from '../../../../config/server.config';
import { RequestService } from '../../../../service/request';

@Component({
  moduleId: module.id,
  selector: 'search-cmp',
  templateUrl: 'search.html',
  styleUrls: ['search.css'],
  providers: [RequestService],
  directives: [PageHead,
  DATEPICKER_DIRECTIVES,
  ROUTER_DIRECTIVES,
  MyDatePickerComponent,
  PAGINATION_DIRECTIVES,
  TOOLTIP_DIRECTIVES,
  MyDropDownComponent]
})

export class SearchComponent implements OnInit {
  CouponDict = CouponDict;
  ExchangeDict = ExchangeDict;
  CouponList = CouponList;
  // 表单校验和control
  public searchForm: any;
  public couponTempId: any;
  // 起始日期
  public startDate1 = new Date(1990,0,1);
  public startDate2 = new Date(1990,0,1);
  // 券列表
  public couponTmpList: any = [];
  // 分页
  public totalItems: number;
  public currentPage: number;
  public itemsPerPage = Conf.itemsPerPage;
  public maxSize: number = Conf.maxPages;

  @ViewChild('d1') d1: any;
  @ViewChild('d2') d2: any;
  @ViewChild('myDropDown') myDropDown: any;

  // 查询参数
  private searchParams: any = {
    type: null,
    id: null,
    firstTime: null,
    lastTime: null,
    index:0
  };

  // 是否在查询中
  private submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService
    ) {
    this.searchForm = this.formBuilder.group({
      couponTempId:['',Validators.pattern('[0-9]{1,10}')]
    });
    this.couponTempId = this.searchForm.controls['couponTempId'];
  }

  // 券模板列表
  getCouponsTmp(options:any) {
    this.submitting = true;
    options.size = this.itemsPerPage;
    this.requestService.getCouponsTmp(options)
    .subscribe(
      (data: any) => {
          this.submitting = false;
          if (data.code === 0) {
            this.couponTmpList = data.result.list;
            this.totalItems = data.result.totalCount;
          }
        },
        (err:any) => {
          this.submitting = false;
          console.log(err);
        });
  }

  ngOnInit() {
    this.getCouponsTmp(this.searchParams);
  }

  pageChanged(event: any): void {
    this.searchParams.index = this.itemsPerPage*(event.page-1);
    this.currentPage = event.page;
    this.getCouponsTmp(this.searchParams);
  }

  showDatePicker1(e: any) {
    this.d1.show();
  }

  showDatePicker2(e: any) {
    this.d2.show();
  }

  getFirstTime() {
    this.searchParams.firstTime = this.d1.getDate();
  }

  getLastTime(event: any) {
    this.searchParams.lastTime = this.d2.getDate();
  }

  search (e:any) {
    this.currentPage = 1;
    this.searchParams.firstTime = this.d1.getDate();
    this.searchParams.lastTime = this.d2.getDate();
    this.searchParams.type = this.myDropDown.getId();
    this.searchParams.index = 0;
    this.getCouponsTmp(this.searchParams);
  }
}
