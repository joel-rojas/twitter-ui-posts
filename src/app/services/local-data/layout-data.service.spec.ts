import { TestBed } from '@angular/core/testing';

import { LayoutDataService } from './layout-data.service';

describe('LayoutDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayoutDataService = TestBed.get(LayoutDataService);
    expect(service).toBeTruthy();
  });
});
