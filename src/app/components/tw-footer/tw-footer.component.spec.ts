import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwFooterComponent } from './tw-footer.component';

describe('TwFooterComponent', () => {
  let component: TwFooterComponent;
  let fixture: ComponentFixture<TwFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
