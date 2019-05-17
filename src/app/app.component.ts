import { Observable } from 'rxjs';
import { LoadingService } from './services/ui/loading.service';
import { Component, AfterContentInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title = 'twitter-ui-posts';
  constructor(private loadingService: LoadingService) {}
  ngAfterContentInit() {}
}
