import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../dto/common/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmployeeDto } from '../dto/employee/employee-dto';
import { CreateEmployeeDto } from '../dto/employee/create-employee-dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl: string = `${environment.APIUrl}api/Employee`;

  constructor(private httpClient: HttpClient = inject(HttpClient)) {}

  create(obj: CreateEmployeeDto): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(`${this.apiUrl}`, obj);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.httpClient.delete<ApiResponse<any>>(`${this.apiUrl}?id=${id}`);
  }

  update(obj: CreateEmployeeDto, id: number): Observable<ApiResponse<any>> {
    return this.httpClient.put<ApiResponse<any>>(
      `${this.apiUrl}?id=${id}`,
      obj
    );
  }

  getList(): Observable<ApiResponse<EmployeeDto[]>> {
    return this.httpClient.get<ApiResponse<EmployeeDto[]>>(`${this.apiUrl}`);
  }
  getById(id: number): Observable<ApiResponse<EmployeeDto>> {
    return this.httpClient.get<ApiResponse<EmployeeDto>>(
      `${this.apiUrl}` + `/${id}`
    );
  }
}
