import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieukienComponent } from './dieukien.component';

describe('DieukienComponent', () => {
  let component: DieukienComponent;
  let fixture: ComponentFixture<DieukienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieukienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieukienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
