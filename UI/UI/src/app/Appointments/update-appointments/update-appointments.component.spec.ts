import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppointmentsComponent } from './update-appointments.component';

describe('UpdateAppointmentsComponent', () => {
  let component: UpdateAppointmentsComponent;
  let fixture: ComponentFixture<UpdateAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
