import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationByHotelComponent } from './reservation-by-hotel.component';

describe('ReservationByHotelComponent', () => {
  let component: ReservationByHotelComponent;
  let fixture: ComponentFixture<ReservationByHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationByHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationByHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
