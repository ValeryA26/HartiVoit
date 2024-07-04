import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private permissions = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn.next(!!localStorage.getItem('token'));
    this.permissions.next(this.getStoredPermissions());
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}token/`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.access);
        this.loggedIn.next(true);
        this.getPermissions().subscribe(permissions => {
          this.setPermissions(permissions);
          this.router.navigate(['/home']);
        });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    this.loggedIn.next(false);
    this.permissions.next({});
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getPermissions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}permisos/`);
  }

  setPermissions(permissions: any): void {
    this.permissions.next(permissions);
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  getStoredPermissions(): any {
    const permissions = localStorage.getItem('permissions');
    return permissions ? JSON.parse(permissions) : {};
  }

  hasPermission(permission: string): boolean {
    const permissions = this.permissions.getValue();
    return permissions[permission] || false;
  }
}
