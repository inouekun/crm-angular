import { TestBed } from '@angular/core/testing';

import { ClientDataService } from './client-data.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientDataService = TestBed.get(ClientDataService);
    expect(service).toBeTruthy();
  });
});
