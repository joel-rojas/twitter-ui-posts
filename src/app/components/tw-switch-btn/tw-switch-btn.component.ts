import { Component, OnInit, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-tw-switch-btn',
  templateUrl: './tw-switch-btn.component.html',
  styleUrls: ['./tw-switch-btn.component.css']
})
export class TwSwitchBtnComponent implements OnInit, AfterContentChecked {
  public defaultSlideConfig: {className: string, checked: boolean, description: string, disabled: boolean, label: string,
    labelPosition: string } =
    {
      checked: false,
      className: '',
      description: null,
      disabled: false,
      label: '',
      labelPosition: 'before'
    };
  public hasDescription: boolean;
  public isLeftPosition: boolean;
  public isRightPosition: boolean;
  @Input() label: string;
  @Input() labelPosition: string;
  @Input() className: string;
  @Input() checked: boolean;
  @Input() description: string;
  @Input() disabled: boolean;
  @Output() switchBtn: EventEmitter<boolean> = new EventEmitter(null);
  public switchButtonCls: object;
  constructor() { }

  ngOnInit() {
    this.setSlideConfig();
  }
  ngAfterContentChecked() {
    this.switchButtonCls = {'switch-btn-on': this.checked, 'switch-btn-off': !this.checked };
  }
  setSlideConfig() {
    this.className = this.className || this.defaultSlideConfig.className;
    this.label = this.label || this.defaultSlideConfig.label;
    this.checked = this.checked || this.defaultSlideConfig.checked;
    this.labelPosition = this.labelPosition || this.defaultSlideConfig.labelPosition;
    this.disabled = this.disabled || this.defaultSlideConfig.disabled;
    this.isLeftPosition = this.labelPosition === 'before';
    this.isRightPosition = this.labelPosition === 'after';
    this.hasDescription = this.description != null;
  }
  onSwitchButtonEvent() {
    this.checked = !this.checked;
    this.switchBtn.emit(this.checked);
  }

}
