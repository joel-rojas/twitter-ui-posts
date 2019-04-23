import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwBodyComponent } from './tw-body.component';

describe('TwBodyComponent', () => {
  let component: TwBodyComponent;
  let fixture: ComponentFixture<TwBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
