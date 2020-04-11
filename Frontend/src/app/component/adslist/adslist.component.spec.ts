import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdslistComponent } from './adslist.component';

describe('AdslistComponent', () => {
  let component: AdslistComponent;
  let fixture: ComponentFixture<AdslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
