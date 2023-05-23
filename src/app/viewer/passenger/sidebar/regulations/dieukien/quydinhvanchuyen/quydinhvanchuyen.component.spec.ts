import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuydinhvanchuyenComponent } from './quydinhvanchuyen.component';

describe('QuydinhvanchuyenComponent', () => {
  let component: QuydinhvanchuyenComponent;
  let fixture: ComponentFixture<QuydinhvanchuyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuydinhvanchuyenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuydinhvanchuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
