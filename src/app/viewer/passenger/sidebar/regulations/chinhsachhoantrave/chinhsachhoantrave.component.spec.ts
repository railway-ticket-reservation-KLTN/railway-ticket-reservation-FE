import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinhsachhoantraveComponent } from './chinhsachhoantrave.component';

describe('ChinhsachhoantraveComponent', () => {
  let component: ChinhsachhoantraveComponent;
  let fixture: ComponentFixture<ChinhsachhoantraveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChinhsachhoantraveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChinhsachhoantraveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
