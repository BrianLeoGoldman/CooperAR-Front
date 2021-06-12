import { TestBed } from '@angular/core/testing';

import { AccessGuardService } from './access-guard.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastrModule} from 'ngx-toastr';

describe('AccessGuardService', () => {
  let service: AccessGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule,
        ToastrModule.forRoot({
          positionClass : 'toast-bottom-right'
        })]
    });
    service = TestBed.inject(AccessGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
