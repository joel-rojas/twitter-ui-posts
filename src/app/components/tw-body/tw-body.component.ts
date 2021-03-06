import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { LoadingService } from '../../services/ui/loading.service';

@Component({
  selector: 'app-tw-body',
  templateUrl: './tw-body.component.html',
  styleUrls: ['./tw-body.component.css']
})
export class TwBodyComponent implements OnInit, OnDestroy {
  public hasLoadedContent = false;
  public hasFailedLoadContent = false;
  public loadingSubject$: BehaviorSubject<number>;
  public subscriptions: Subscription = new Subscription();
  constructor(private loadingService: LoadingService) {
    this.loadingSubject$ = this.loadingService.loadingSubject;
  }
  ngOnInit() {
    this.subscriptions.add(
      this.loadingSubject$.subscribe(value => {
        this.hasLoadedContent = value === 0;
        this.hasFailedLoadContent = value === -1;
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
