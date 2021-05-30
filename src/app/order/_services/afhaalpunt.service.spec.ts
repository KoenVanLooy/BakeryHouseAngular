import { TestBed } from '@angular/core/testing';

import { AfhaalpuntService } from './afhaalpunt.service';

describe('AfhaalpuntService', () => {
  let service: AfhaalpuntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfhaalpuntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
