import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {  } from 'events';

@Component({
  selector: 'app-tw-header',
  templateUrl: './tw-header.component.html',
  styleUrls: ['./tw-header.component.css']
})
export class TwHeaderComponent implements OnInit {
  public editLayoutCSSClasses;
  public menuNavbarCSSClasses;
  public openEditLayout = false;
  public openNavbar = true;
  constructor() { }

  ngOnInit() {
    this.setComponentUIBehavior();
  }
  setComponentUIBehavior() {
    this.menuNavbarCSSClasses = {
      'collapse': this.openNavbar
    };
    this.openEditLayout = !this.openNavbar && this.openEditLayout;
  }
  // Events
  openEditLayoutEvent() {
    this.openEditLayout = !this.openEditLayout;
  }
  toggleNavbarEvent() {
    this.openNavbar = !this.openNavbar;
    this.setComponentUIBehavior();
  }

}
