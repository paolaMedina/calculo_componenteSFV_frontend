import { TestBed, inject } from '@angular/core/testing';

import { FvFieldService } from '@app/core/services/fv-field.service';

describe('FvFieldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FvFieldService]
    });
  });

  it('should be created', inject([FvFieldService], (service: FvFieldService) => {
    expect(service).toBeTruthy();
  }));
});
