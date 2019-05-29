import { LayoutDataService } from './services/local-data/layout-data.service';
import { Component, AfterContentChecked, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PostService } from './services/ui/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {
  public selectThemeSubject$: BehaviorSubject<string>;
  public subscription = new Subscription();
  public themeCls: string;
  public themeClsObj: object;
  public title = 'twitter-posts-app';
  constructor(private postService: PostService, private layoutDataService: LayoutDataService) {
    this.selectThemeSubject$ = this.postService.selectThemeSubject$;
  }
  ngOnInit() {
    this.subscription.add(this.selectThemeSubject$.subscribe(theme => this.themeCls = theme));
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
