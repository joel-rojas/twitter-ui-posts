import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TwitterEffects } from './twitter.effects';

describe('TwitterEffects', () => {
  let actions$: Observable<any>;
  let effects: TwitterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TwitterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TwitterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
