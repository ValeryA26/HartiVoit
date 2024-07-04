import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ClrFormsModule, ClrDropdownModule } from '@clr/angular';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ClrFormsModule,
        ClrDropdownModule,
        CommonModule,
        RouterTestingModule,
        LoginComponent, // Importa el componente standalone aquí
      ],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with username and password', () => {
    expect(component.form.username).toBeDefined();
    expect(component.form.password).toBeDefined();
  });

  it('should call login method from AuthService on form submit', () => {
    const authServiceSpy = spyOn(authService, 'login').and.returnValue(of({ access: 'token', refresh: 'token' }));
    component.form.username = 'test';
    component.form.password = 'test';
    component.login();
    expect(authServiceSpy).toHaveBeenCalledWith('test', 'test');
  });

  it('should set loginFailed to true on login failure', () => {
    spyOn(authService, 'login').and.returnValue(throwError({ error: 'Invalid credentials' }));
    component.form.username = 'test';
    component.form.password = 'test';
    component.login();
    expect(component.loginFailed).toBeTrue();
  });
});
