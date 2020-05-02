import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsImgComponent } from './news-img.component';

describe('NewsImgComponent', () => {
  let component: NewsImgComponent;
  let fixture: ComponentFixture<NewsImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
