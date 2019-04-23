import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tw-card-container',
  templateUrl: './tw-card-container.component.html',
  styleUrls: ['./tw-card-container.component.css']
})
export class TwCardContainerComponent implements OnInit {
  @Input() userPosts;
  constructor() { }

  ngOnInit() {}

}
