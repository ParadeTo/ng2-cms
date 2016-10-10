import { Component,ViewChild,OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder,Validators } from '@angular/common';
import { PageHead } from '../../../common/page-head/page-head';
import { MyDatePickerComponent } from '../../../common/my-date-picker/index';
import { DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES,TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RequestService } from '../../../../service/request';
import { Conf } from '../../../../config/server.config';

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
	],
})

export class SearchComponent implements OnInit {
  	// 表单校验和control
  	public searchForm: any;
 	public activityId: any;
 	public activityName: any;
	// 活动列表
	public activities: any = [];
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
		name: null,
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
	    	activityId:['',Validators.pattern('[0-9]{1,10}')],
	    	activityName:['',Validators.pattern('[^~!@#$%^&*`]{1,50}')]
	    });
	    this.activityId = this.searchForm.controls['activityId'];
	    this.activityName = this.searchForm.controls['activityName'];
	}

	/**
	 * [得到活动列表]
	 * @param  {any}    index [页数-1]
	 * @return {[type]}       [null]
	 */
	 getActivities(options:any) {
	 	this.submitting = true;
	 	options.size = this.itemsPerPage;
	 	this.requestService.getActivities(options)
	 	.subscribe(
	 		(data: any) => {
			 	this.submitting = false;
	 			if (data.code === 0) {
	 				this.activities = data.result.list;
	 				this.totalItems = data.result.totalCount;
	 			}
	 		},
	 		(err:any) => {
		          		this.submitting = false;
				console.log(err);
		      	});
	 }

	 ngOnInit() {
	 	this.getActivities(this.searchParams);
	 }

	 pageChanged(event: any): void {
	 	this.searchParams.index = this.itemsPerPage*(event.page-1);
	 	this.getActivities(this.searchParams);
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
	 	this.searchParams.index = 0;
	 	this.getActivities(this.searchParams);
	 }
}
