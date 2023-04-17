import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieukhoansudungComponent } from './dieukhoansudung.component';

describe('DieukhoansudungComponent', () => {
  let component: DieukhoansudungComponent;
  let fixture: ComponentFixture<DieukhoansudungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieukhoansudungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieukhoansudungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
