import { TestBed } from '@angular/core/testing';

import { NewspaperService } from './newspaper.service';

describe('NewpaperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewspaperService = TestBed.get(NewspaperService);
    expect(service).toBeTruthy();
  });
});
