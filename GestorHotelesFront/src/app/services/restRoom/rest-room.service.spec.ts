import { TestBed } from '@angular/core/testing';

import { RestRoomService } from './rest-room.service';

describe('RestRoomService', () => {
  let service: RestRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
