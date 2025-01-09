import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../dto/common/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterDto } from '../dto/auth/register-dto';
import { LoginDto } from '../dto/auth/login-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = `${environment.APIUrl}api/User`;

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private httpClient: HttpClient = inject(HttpClient)) {}

  register(obj: RegisterDto): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(
      `${this.apiUrl}/register`,
      obj
    );
  }
  login(obj: LoginDto): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(`${this.apiUrl}/login`, obj);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
