import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwSwitchBtnComponent } from './tw-switch-btn.component';

describe('TwSwitchBtnComponent', () => {
  let component: TwSwitchBtnComponent;
  let fixture: ComponentFixture<TwSwitchBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwSwitchBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwSwitchBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
