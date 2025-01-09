import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
