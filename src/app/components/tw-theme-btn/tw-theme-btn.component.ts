import { Component, OnInit, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-tw-theme-btn',
  templateUrl: './tw-theme-btn.component.html',
  styleUrls: ['./tw-theme-btn.component.css']
})
export class TwThemeBtnComponent implements AfterContentChecked{
  public activeClsObj: object;
  @Input() select: string;
  @Input() defaultCls: string;
  @Input() isActive: boolean;
  @Output() selectTwTheme: EventEmitter<string> = new EventEmitter(null);
  constructor() { }
  ngAfterContentChecked() {
    this.activeClsObj = {
      active: this.isActive
    };
  }
  selectTheme() {
    this.selectTwTheme.emit(this.select);
  }

}
