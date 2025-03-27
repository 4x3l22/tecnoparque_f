import { TestBed } from '@angular/core/testing';

import { CrearcuentaService } from './crearcuenta.service';

describe('CrearcuentaService', () => {
  let service: CrearcuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearcuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
