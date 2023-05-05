import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SussecssTicketsComponent } from './sussecss-tickets.component';

describe('SussecssTicketsComponent', () => {
  let component: SussecssTicketsComponent;
  let fixture: ComponentFixture<SussecssTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SussecssTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SussecssTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
