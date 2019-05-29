import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwThemeBtnComponent } from './tw-theme-btn.component';

describe('TwThemeBtnComponent', () => {
  let component: TwThemeBtnComponent;
  let fixture: ComponentFixture<TwThemeBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwThemeBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwThemeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
