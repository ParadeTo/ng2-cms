import { Component,Input,Output,EventEmitter } from '@angular/core';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	moduleId: module.id,
	selector: 'my-drop-down-cmp',
	templateUrl: 'my-drop-down.html',
	styleUrls: ['my-drop-down.css'],
	directives: [DROPDOWN_DIRECTIVES],
	exportAs: 'myDropDown'
})

export class MyDropDownComponent {
	// 默认选择第一个
	@Input('selectId') private selectId: any;
	// 父组件传递进来的参数
	@Input('list') private list:any;
	// 当改变了选择时给父组件发送事件
	@Output('selectChange') private selectChange = new EventEmitter();
	// 是否禁用
	@Input('isDisabled') private isDisabled:boolean;
	private text = '';
	private id:any;

	ngOnChanges () {
		if (this.selectId || (this.selectId !== undefined && this.selectId.toString() === '0')) {
			for (let i=0;i<this.list.length;i++) {
				if (this.list[i].id.toString() === this.selectId.toString()) {
					this.text = this.list[i].text;
					this.id = this.list[i].id;
				}
			}
		}
	}

	public getId () {
		return this.id;
	}

	public changeSelect(id: any,text: any,i: any) {
		this.text = text;
		this.id = id;
		this.selectChange.emit({id:id,text:text,index:i});
	}
}
