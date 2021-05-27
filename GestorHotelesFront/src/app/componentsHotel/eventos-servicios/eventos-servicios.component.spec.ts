import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosServiciosComponent } from './eventos-servicios.component';

describe('EventosServiciosComponent', () => {
  let component: EventosServiciosComponent;
  let fixture: ComponentFixture<EventosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
