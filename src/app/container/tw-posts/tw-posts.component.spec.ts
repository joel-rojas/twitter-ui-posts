import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwPostsComponent } from './tw-posts.component';

describe('TwPostsComponent', () => {
  let component: TwPostsComponent;
  let fixture: ComponentFixture<TwPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
