import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../dto/common/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreatePositionDto } from '../dto/position/create-position-dto';
import { PositionDto } from '../dto/position/position-dto';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  apiUrl: string = `${environment.APIUrl}api/Position`;

  constructor(private httpClient: HttpClient = inject(HttpClient)) {}

  create(obj: CreatePositionDto): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(`${this.apiUrl}`, obj);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.httpClient.delete<ApiResponse<any>>(`${this.apiUrl}?id=${id}`);
  }

  update(obj: CreatePositionDto, id: number): Observable<ApiResponse<any>> {
    return this.httpClient.put<ApiResponse<any>>(
      `${this.apiUrl}?id=${id}`,
      obj
    );
  }

  getList(): Observable<ApiResponse<PositionDto[]>> {
    return this.httpClient.get<ApiResponse<PositionDto[]>>(`${this.apiUrl}`);
  }
  getById(id: number): Observable<ApiResponse<PositionDto>> {
    return this.httpClient.get<ApiResponse<PositionDto>>(
      `${this.apiUrl}` + `/${id}`
    );
  }
}
