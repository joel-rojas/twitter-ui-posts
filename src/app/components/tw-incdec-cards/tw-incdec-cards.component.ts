import { Component, OnInit, Output, EventEmitter, Input, AfterContentChecked, SimpleChanges, OnChanges } from '@angular/core';
import { LayoutDataService } from './../../services/local-data/layout-data.service';

@Component({
  selector: 'app-tw-incdec-cards',
  templateUrl: './tw-incdec-cards.component.html',
  styleUrls: ['./tw-incdec-cards.component.css']
})
export class TwIncdecCardsComponent implements OnInit, OnChanges {
  public disableInput = true;
  public disableDecrementBtn = false;
  public disableIncrementBtn = true;
  public minValue = this.layoutDataService.MIN_TWITTER_POSTS_ITEMS;
  @Input() maxValue: number;
  @Input() label: string;
  @Input() value: number;
  @Output() decreaseValue: EventEmitter<number> = new EventEmitter(null);
  @Output() increaseValue: EventEmitter<number> = new EventEmitter(null);
  constructor(private layoutDataService: LayoutDataService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.disableDecrementBtn = changes.value.currentValue === this.minValue;
    this.disableIncrementBtn = changes.value.currentValue === this.maxValue;
  }
  onDecreaseValueEvent() {
    this.decreaseValue.emit(this.value);
  }
  onIncreaseValueEvent() {
    this.increaseValue.emit(this.value);
  }

}
