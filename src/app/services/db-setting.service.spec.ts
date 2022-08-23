import { TestBed } from '@angular/core/testing';

import { DbSettingService } from './db-setting.service';

describe('DbSettingService', () => {
  let service: DbSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
