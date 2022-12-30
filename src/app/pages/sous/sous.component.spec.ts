import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousComponent } from './sous.component';

describe('SousComponent', () => {
  let component: SousComponent;
  let fixture: ComponentFixture<SousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
