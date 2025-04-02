import { TestBed } from '@angular/core/testing';

import { AuthWatcherService } from './auth-watcher.service';

describe('AuthWatcherService', () => {
  let service: AuthWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
