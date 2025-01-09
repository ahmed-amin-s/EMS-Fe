import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../dto/common/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateDepartmentDto } from '../dto/department/create-department-dto';
import { DepartmentDto } from '../dto/department/department-dto';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  apiUrl: string = `${environment.APIUrl}api/Department`;

  constructor(private httpClient: HttpClient = inject(HttpClient)) {}

  create(obj: CreateDepartmentDto): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(`${this.apiUrl}`, obj);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.httpClient.delete<ApiResponse<any>>(`${this.apiUrl}?id=${id}`);
  }

  update(obj: CreateDepartmentDto, id: number): Observable<ApiResponse<any>> {
    return this.httpClient.put<ApiResponse<any>>(
      `${this.apiUrl}?id=${id}`,
      obj
    );
  }

  getList(): Observable<ApiResponse<DepartmentDto[]>> {
    return this.httpClient.get<ApiResponse<DepartmentDto[]>>(`${this.apiUrl}`);
  }
  getById(id: number): Observable<ApiResponse<DepartmentDto>> {
    return this.httpClient.get<ApiResponse<DepartmentDto>>(
      `${this.apiUrl}` + `/${id}`
    );
  }
}
