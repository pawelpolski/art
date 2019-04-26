import { TestBed } from '@angular/core/testing';

import { NeededDataService } from './needed-data.service';

describe('NeededDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NeededDataService = TestBed.get(NeededDataService);
    expect(service).toBeTruthy();
  });
});
