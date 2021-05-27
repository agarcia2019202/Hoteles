import { TestBed } from '@angular/core/testing';

import { RestFeatureService } from './rest-feature.service';

describe('RestFeatureService', () => {
  let service: RestFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
