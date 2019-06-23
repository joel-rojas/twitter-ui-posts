import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwHeaderComponent } from './tw-header.component';

describe('TwHeaderComponent', () => {
  let component: TwHeaderComponent;
  let fixture: ComponentFixture<TwHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
