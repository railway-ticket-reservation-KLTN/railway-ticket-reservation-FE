import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnTicketsComponent } from './return-tickets.component';

describe('ReturnTicketsComponent', () => {
  let component: ReturnTicketsComponent;
  let fixture: ComponentFixture<ReturnTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
