import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-tw-switch-btn',
  templateUrl: './tw-switch-btn.component.html',
  styleUrls: ['./tw-switch-btn.component.css']
})
export class TwSwitchBtnComponent implements OnInit {
  @Input() cssClasses: any;
  @Input() color: string;
  @Input() checked: boolean;
  @Input() labelPosition: string;
  @Input() disabled: boolean;
  @Output() switchBtn: EventEmitter<MatSlideToggleChange> = new EventEmitter(null);
  public defaultSlideConfig: {cssClasses: any, color: string, checked: boolean, labelPosition: string, disabled: boolean} =
    {
      cssClasses: {},
      color: 'primary',
      checked: false,
      labelPosition: 'before',
      disabled: false
    };
  constructor() { }

  ngOnInit() {
    this.setSlideConfig();
  }
  setSlideConfig() {
    this.cssClasses = this.cssClasses || this.defaultSlideConfig.cssClasses;
    this.color = this.color || this.defaultSlideConfig.color;
    this.checked = this.checked || this.defaultSlideConfig.checked;
    this.labelPosition = this.labelPosition || this.defaultSlideConfig.labelPosition;
    this.disabled = this.disabled || this.defaultSlideConfig.disabled;
  }
  onSwitchButtonEvent(event: MatSlideToggleChange) {
    this.switchBtn.emit(event);
  }

}
