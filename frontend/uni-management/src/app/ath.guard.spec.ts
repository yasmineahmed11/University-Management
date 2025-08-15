import { TestBed } from '@angular/core/testing';

import { AthGuard } from './ath.guard';

describe('AthGuard', () => {
  let guard: AthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
