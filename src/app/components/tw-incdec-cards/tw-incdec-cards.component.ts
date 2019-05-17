import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tw-incdec-cards',
  templateUrl: './tw-incdec-cards.component.html',
  styleUrls: ['./tw-incdec-cards.component.css']
})
export class TwIncdecCardsComponent implements OnInit, OnChanges {
  public maxValue = 30;
  public minValue = 1;
  public disableInput = true;
  public disableDecrementBtn = false;
  public disableIncrementBtn = true;
  @Input() value: number;
  @Input() label: string;
  @Output() decreaseValue: EventEmitter<number> = new EventEmitter(null);
  @Output() increaseValue: EventEmitter<number> = new EventEmitter(null);
  constructor() { }

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
