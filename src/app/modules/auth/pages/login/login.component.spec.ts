import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService, AuthResponse } from '../../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import * as AuthActions from '../../../../store/auth/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let storeSpy: jasmine.SpyObj<Store>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }) as any); // Mock Swal

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and dispatch action, store token, and redirect', fakeAsync(() => {
    const mockResponse: AuthResponse = { token: 'test-token', userId: 123 };
    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.username = 'user';
    component.password = 'pass';

    component.login();
    tick(); // wait for Swal

    expect(authServiceSpy.login).toHaveBeenCalledWith({ username: 'user', password: 'pass' });
    expect(storeSpy.dispatch).toHaveBeenCalledWith(AuthActions.login({ token: 'test-token' }));
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(localStorage.getItem('userId')).toBe('123');
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'success' }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
  }));

  it('should show error alert on login failure', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Invalid')));

    component.username = 'wrong';
    component.password = 'wrong';

    component.login();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      icon: 'error',
      title: 'Error',
      text: 'Correo o contraseña incorrectos.',
    }));
    expect(storeSpy.dispatch).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));
});
