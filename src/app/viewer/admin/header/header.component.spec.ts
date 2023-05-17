import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponentAdmin } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponentAdmin;
  let fixture: ComponentFixture<HeaderComponentAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponentAdmin ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponentAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
