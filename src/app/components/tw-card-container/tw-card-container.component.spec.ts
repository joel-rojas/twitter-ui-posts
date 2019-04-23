import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwCardContainerComponent } from './tw-card-container.component';

describe('TwCardContainerComponent', () => {
  let component: TwCardContainerComponent;
  let fixture: ComponentFixture<TwCardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwCardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
