import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges, ChangeDetectionStrategy,
  ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tw-card-container',
  templateUrl: './tw-card-container.component.html',
  styleUrls: ['./tw-card-container.component.css']
})
export class TwCardContainerComponent implements OnInit, OnChanges {
  public dragDropListCSS: object;
  @Input() enableOrderColumn: boolean;
  @Input() userPosts;
  @Output() dragDropTwitterPostsColumn: EventEmitter<any> = new EventEmitter(null);
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    const {enableOrderColumn} = changes;
    if (enableOrderColumn && enableOrderColumn.currentValue !== enableOrderColumn.previousValue) {
      this.setDragDropListCSSClasses();
    }
  }
  setDragDropListCSSClasses() {
    this.dragDropListCSS = {
      'tw-posts-drag-drop--ctn-list--item-enabled': this.enableOrderColumn,
      'tw-posts-drag-drop--ctn-list--item-disabled': !this.enableOrderColumn
    };
  }
  onDropTwitterUsersPosts(event: CdkDragDrop<object[]>) {
    const {previousIndex, currentIndex} = event;
    this.dragDropTwitterPostsColumn.emit({previousIndex, currentIndex});
  }
}
