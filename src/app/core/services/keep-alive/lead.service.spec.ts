import { TestBed } from '@angular/core/testing';

import { KeepAliveService } from './keep-alive.service';

describe('LeadService', () => {
  let service: KeepAliveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeepAliveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
