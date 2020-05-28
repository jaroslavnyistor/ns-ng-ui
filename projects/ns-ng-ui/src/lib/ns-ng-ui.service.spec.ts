import { TestBed } from '@angular/core/testing';

import { NsNgUiService } from './ns-ng-ui.service';

describe('NsNgUiService', () => {
  let service: NsNgUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsNgUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
