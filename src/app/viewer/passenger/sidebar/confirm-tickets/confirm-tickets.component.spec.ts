import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTicketsComponent } from './confirm-tickets.component';

describe('ConfirmTicketsComponent', () => {
  let component: ConfirmTicketsComponent;
  let fixture: ComponentFixture<ConfirmTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
