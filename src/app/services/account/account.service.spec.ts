import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { iLogin } from 'src/app/shared/interfaces/account/account.interface';
import { environment } from 'src/environments/environment';



describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.BACKEND_URL;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [AccountService]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should send a GET request to the API with the email and password in the query parameters', () => {
      const credentials: iLogin = {
        email: 'test@example.com',
        password: 'password'
      };
      service.login(credentials).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/auth?email=${credentials.email}&password=${credentials.password}`);
      expect(req.request.method).toEqual('GET');
    });
  });
});
