import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwIncdecCardsComponent } from './tw-incdec-cards.component';

describe('TwIncdecCardsComponent', () => {
  let component: TwIncdecCardsComponent;
  let fixture: ComponentFixture<TwIncdecCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwIncdecCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwIncdecCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
