import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tw-card',
  templateUrl: './tw-card.component.html',
  styleUrls: ['./tw-card.component.css']
})
export class TwCardComponent implements OnInit {
  @Input() tweet;
  constructor() { }

  ngOnInit() {
  }

}
