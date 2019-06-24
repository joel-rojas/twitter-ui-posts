import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LayoutDataService } from './../../services/local-data/layout-data.service';

@Component({
  selector: 'app-tw-incdec-cards',
  templateUrl: './tw-incdec-cards.component.html',
  styleUrls: ['./tw-incdec-cards.component.css']
})
export class TwIncdecCardsComponent implements OnInit, OnChanges {
  public maxValue = this.layoutDataService.MAX_TWITTER_POSTS_ITEMS;
  public minValue = this.layoutDataService.MIN_TWITTER_POSTS_ITEMS;
  public disableInput = true;
  public disableDecrementBtn = false;
  public disableIncrementBtn = true;
  @Input() value: number;
  @Input() label: string;
  @Output() decreaseValue: EventEmitter<number> = new EventEmitter(null);
  @Output() increaseValue: EventEmitter<number> = new EventEmitter(null);
  constructor(private layoutDataService: LayoutDataService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    const valueName = 'value';
    const chng = changes[valueName];
    this.disableIncrementBtn = chng.currentValue === this.maxValue;
    this.disableDecrementBtn = chng.currentValue === this.minValue;
  }
  onDecreaseValueEvent() {
    this.decreaseValue.emit(this.value);
  }
  onIncreaseValueEvent() {
    this.increaseValue.emit(this.value);
  }

}
