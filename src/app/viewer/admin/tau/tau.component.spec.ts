import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauComponent } from './tau.component';

describe('TauComponent', () => {
  let component: TauComponent;
  let fixture: ComponentFixture<TauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
