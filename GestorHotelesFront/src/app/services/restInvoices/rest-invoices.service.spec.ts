import { TestBed } from '@angular/core/testing';

import { RestInvoicesService } from './rest-invoices.service';

describe('RestInvoicesService', () => {
  let service: RestInvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestInvoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
