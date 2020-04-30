import { TestBed } from '@angular/core/testing';

import { PerfectTableService } from './perfect-table.service';

describe('PerfectTableService', () => {
  let service: PerfectTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfectTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
