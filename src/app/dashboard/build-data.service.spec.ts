import { TestBed } from '@angular/core/testing';

import { BuildDataService } from './build-data.service';

describe('BuildDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildDataService = TestBed.get(BuildDataService);
    expect(service).toBeTruthy();
  });
});
