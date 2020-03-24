import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstemplateComponent } from './newstemplate.component';

describe('NewstemplateComponent', () => {
  let component: NewstemplateComponent;
  let fixture: ComponentFixture<NewstemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
