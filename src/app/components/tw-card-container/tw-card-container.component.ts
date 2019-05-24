import { LoadingService } from 'src/app/services/ui/loading.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TwitterUser } from '../../store/twitter/twitter.model';

@Component({
  selector: 'app-tw-card-container',
  templateUrl: './tw-card-container.component.html',
  styleUrls: ['./tw-card-container.component.css']
})
export class TwCardContainerComponent implements OnInit, OnChanges, OnDestroy {
  public dragDropListCSS: object;
  public hasLoadedContent: boolean;
  public loadingSubject$: BehaviorSubject<number>;
  public subscriptions: Subscription = new Subscription();
  @Input() enableOrderColumn: boolean;
  @Input() userPosts: TwitterUser[];
  @Output() dragDropTwitterPostsColumn: EventEmitter<any> = new EventEmitter(null);
  constructor(private loadingService: LoadingService) {
    this.loadingSubject$ = this.loadingService.loadingSubject;
  }
  ngOnInit() {
    this.subscriptions.add(
      this.loadingSubject$.subscribe(value => {
        this.hasLoadedContent = value === 0;
      })
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    const {enableOrderColumn} = changes;
    if (enableOrderColumn && enableOrderColumn.currentValue !== enableOrderColumn.previousValue) {
      this.setDragDropListCSSClasses();
    }
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
