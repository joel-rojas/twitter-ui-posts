import { Component, AfterContentChecked, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { LayoutData } from './services/local-data/layout-data.config';
import { LayoutDataService } from './services/local-data/layout-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {
  public layoutDataSubject$: Observable<LayoutData>;
  public subscription = new Subscription();
  public themeCls: string;
  public themeClsObj: object;
  public title = 'twitter-posts-app';
  constructor(private layoutDataService: LayoutDataService) {
    this.layoutDataSubject$ = this.layoutDataService.getLayoutDataAsSubject();
  }
  ngOnInit() {
    this.subscription.add(
      this.layoutDataService.initLayoutLocalDataConfig().subscribe()
    );
    this.subscription.add(
      this.layoutDataSubject$.subscribe((dataStorage: LayoutData) => {
        const {twitterTheme} = dataStorage;
        this.themeCls = twitterTheme;
      }
    ));
  }
  ngAfterContentChecked() {
    this.themeClsObj = {
      theme1: this.themeCls === this.layoutDataService.appThemes.FIRST,
      theme2: this.themeCls === this.layoutDataService.appThemes.SECOND,
      theme3: this.themeCls === this.layoutDataService.appThemes.THIRD
    };
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
