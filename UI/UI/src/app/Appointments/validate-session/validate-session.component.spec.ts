import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateSessionComponent } from './validate-session.component';

describe('ValidateSessionComponent', () => {
  let component: ValidateSessionComponent;
  let fixture: ComponentFixture<ValidateSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
