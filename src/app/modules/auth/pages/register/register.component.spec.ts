import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../../core/services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    spyOn(Swal, 'fire'); // Mock Swal.fire to prevent UI dialogs

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.register and navigate on success', fakeAsync(() => {
    authServiceSpy.register.and.returnValue(of({ token: 'abc', userId: 1 }));
    component.username = 'testuser';
    component.password = 'testpass';

    component.onSubmit();
    tick();

    expect(authServiceSpy.register).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpass',
    });
    expect(Swal.fire).toHaveBeenCalledWith('Registro exitoso', 'Por favor inicia sesión.', 'success');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
  }));

  it('should show error alert on registration failure', fakeAsync(() => {
    authServiceSpy.register.and.returnValue(throwError(() => new Error('Error')));
    component.username = 'testuser';
    component.password = 'testpass';

    component.onSubmit();
    tick();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Hubo un problema con el registro.', 'error');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));
});
