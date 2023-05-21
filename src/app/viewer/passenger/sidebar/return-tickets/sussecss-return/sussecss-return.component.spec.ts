import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SussecssReturnComponent } from './sussecss-return.component';

describe('SussecssReturnComponent', () => {
  let component: SussecssReturnComponent;
  let fixture: ComponentFixture<SussecssReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SussecssReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SussecssReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
