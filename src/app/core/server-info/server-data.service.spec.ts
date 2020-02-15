import { TestBed } from '@angular/core/testing';

import { ServerDataService } from './server-data.service';

describe('ServerDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerDataService = TestBed.inject(ServerDataService);
    expect(service).toBeTruthy();
  });
});
