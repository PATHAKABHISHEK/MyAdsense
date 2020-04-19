import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPublishedAdsComponent } from './my-published-ads.component';

describe('MyPublishedAdsComponent', () => {
  let component: MyPublishedAdsComponent;
  let fixture: ComponentFixture<MyPublishedAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPublishedAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPublishedAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
