import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickNewsComponent } from './pick-news.component';

describe('PickNewsComponent', () => {
  let component: PickNewsComponent;
  let fixture: ComponentFixture<PickNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
