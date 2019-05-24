import { Directive, HostListener, Inject, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appBodyListener]'
})
export class BodyListenerDirective implements AfterContentInit {
  public activeCls = 'active';
  public document: Document;
  public editLayoutBtnEl: HTMLElement;
  public editLayoutBtnCls = 'nav-link dropdown-toggle form-control';
  public editLayoutBtnSelector = 'header .dropdown-toggle';
  public editMenuCls =  'dropdown-menu';
  public editMenuEl: HTMLElement;
  public editMenuSelector = 'header .dropdown-menu';
  public showCls = 'show';

  @HostListener('document:click', ['$event.target']) onClick(el: HTMLElement) {
    this.showHideEditLayoutMenuComponent(el);
  }
  constructor(@Inject('DOCUMENT') private documentArr: Document[]) {
    const [document] = this.documentArr;
    this.document = document;
  }
  ngAfterContentInit() {
    this.editMenuEl = this.document.querySelector(this.editMenuSelector);
    this.editLayoutBtnEl = this.document.querySelector(this.editLayoutBtnSelector);
  }
  showHideEditLayoutMenuComponent(el: HTMLElement) {
    const hasShowCls = this.editMenuEl.className.indexOf(this.showCls) >= 0;
    if (el.id === this.editLayoutBtnEl.id) {
      if (hasShowCls) {
        this.editMenuEl.className = this.editMenuCls;
        this.editLayoutBtnEl.className = this.editLayoutBtnCls;
      } else {
        this.editLayoutBtnEl.className = `${this.editLayoutBtnCls} ${this.activeCls}`;
        this.editMenuEl.className = `${this.editMenuCls} ${this.showCls}`;
      }
    } else if (hasShowCls && el.id !== this.editLayoutBtnEl.id && el.closest(this.editMenuSelector) === null) {
        this.editMenuEl.className = this.editMenuCls;
        this.editLayoutBtnEl.className = this.editLayoutBtnCls;
    }
  }

}
