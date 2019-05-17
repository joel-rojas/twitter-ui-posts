import { Component, OnInit, Input, AfterContentInit, AfterContentChecked } from '@angular/core';
import { LoadingService } from './../../services/ui/loading.service';

@Component({
  selector: 'app-loading-mask',
  templateUrl: './loading-mask.component.html',
  styleUrls: ['./loading-mask.component.css']
})
export class LoadingMaskComponent implements OnInit, AfterContentChecked {
  public loadingValue: number;
  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
  }
  ngAfterContentChecked() {
    this.loadingValue = this.loadingService.loadingSubject.getValue();
  }
}
