import { inject, Injectable } from '@angular/core';
import { CategoryCreationDTO, CategoryDTO } from './categories.models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaginationDTO } from '../shared/models/PaginationDTO';
import { buildQueryParams } from '../shared/functions/buildQueryParams';
import { ICRUDService } from '../shared/interfaces/ICRUDService';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements ICRUDService<CategoryDTO, CategoryCreationDTO> {

  constructor() { }

  private http = inject(HttpClient);
  private baseURL = environment.apiURL + '/categories';

  public getPaginated(pagination: PaginationDTO): Observable<HttpResponse<CategoryDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.http.get<CategoryDTO[]>(this.baseURL, {params: queryParams, observe: 'response'});
  }

  public getById(id: number): Observable<CategoryDTO>{
    return this.http.get<CategoryDTO>(`${this.baseURL}/${id}`);
  }

  public getAll(): Observable<CategoryDTO[]>{
    return this.http.get<CategoryDTO[]>(`${this.baseURL}/all`);
  }

  public create(category: CategoryCreationDTO){
    return this.http.post(this.baseURL, category);
  }

  public update(id: number, category: CategoryCreationDTO){
    return this.http.put(`${this.baseURL}/${id}`, category);
  }

  public delete(id: number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
