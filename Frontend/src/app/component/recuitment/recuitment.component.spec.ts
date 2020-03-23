import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuitmentComponent } from './recuitment.component';

describe('RecuitmentComponent', () => {
  let component: RecuitmentComponent;
  let fixture: ComponentFixture<RecuitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
