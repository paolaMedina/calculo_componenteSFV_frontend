import { TestBed, inject } from '@angular/core/testing';

import { SfvService } from './sfv.service';

describe('SfvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SfvService]
    });
  });

  it('should be created', inject([SfvService], (service: SfvService) => {
    expect(service).toBeTruthy();
  }));
});
