import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelInicioComponent } from './hotel-inicio.component';

describe('HotelInicioComponent', () => {
  let component: HotelInicioComponent;
  let fixture: ComponentFixture<HotelInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
