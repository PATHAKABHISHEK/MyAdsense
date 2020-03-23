import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrimonialComponent } from './matrimonial.component';

describe('MatrimonialComponent', () => {
  let component: MatrimonialComponent;
  let fixture: ComponentFixture<MatrimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
