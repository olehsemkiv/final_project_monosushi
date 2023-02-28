import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';



import { RouterTestingModule } from '@angular/router/testing';
import { ROLE } from '../../constants/role.constants';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';



describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // it('should allow access if user is logged in as admin', () => {
  //   // Arrange
  //   const route1 = new ActivatedRouteSnapshot();
  //   const stateSnapshot = new RouterStateSnapshot();
  //   // const snap = new RouterStateSnapshot();
  //   spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: ROLE.ADMIN }));

  //   // Act
  //   const result = guard.canActivate(route1, stateSnapshot);

  //   // Assert
  //   expect(result).toBe(true);
  // });



});
