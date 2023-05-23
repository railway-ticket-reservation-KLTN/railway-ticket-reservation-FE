import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuavetructuyenComponent } from './muavetructuyen.component';

describe('MuavetructuyenComponent', () => {
  let component: MuavetructuyenComponent;
  let fixture: ComponentFixture<MuavetructuyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuavetructuyenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuavetructuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
