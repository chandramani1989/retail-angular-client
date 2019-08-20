import { TestBed } from '@angular/core/testing';

import { RetailService } from './retail.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetailService = TestBed.get(RetailService);
    expect(service).toBeTruthy();
  });
});
