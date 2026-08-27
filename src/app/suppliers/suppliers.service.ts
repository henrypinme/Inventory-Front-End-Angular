import { inject, Injectable } from '@angular/core';
import { SupplierAutoCompleteDTO, SupplierCreationDTO, SupplierDTO } from './suppliers.models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { PaginationDTO } from '../shared/models/PaginationDTO';
import { Observable } from 'rxjs';
import { buildQueryParams } from '../shared/functions/buildQueryParams';
import { ICRUDService } from '../shared/interfaces/ICRUDService';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService implements ICRUDService<SupplierDTO, SupplierCreationDTO> {

  constructor() { }

  private http = inject(HttpClient);
  private baseURL = environment.apiURL + '/suppliers';

  public getPaginated(pagination: PaginationDTO): Observable<HttpResponse<SupplierDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.http.get<SupplierDTO[]>(this.baseURL, {params: queryParams, observe: 'response'});
  }

  public getById(id: number): Observable<SupplierDTO>{
      return this.http.get<SupplierDTO>(`${this.baseURL}/${id}`);
  }

  public getByName(name: string): Observable<SupplierAutoCompleteDTO[]>{
      return this.http.get<SupplierAutoCompleteDTO[]>(`${this.baseURL}/${name}`);
  }  

  public create(supplier: SupplierCreationDTO): Observable<any> {
    const formData = this.buildFormData(supplier);
    
    return this.http.post(this.baseURL, formData);
  }

  public update(id: number, supplier: SupplierCreationDTO){
      return this.http.put(`${this.baseURL}/${id}`, supplier);
    }
  
  public delete(id: number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  private buildFormData(supplier: SupplierCreationDTO): FormData{
    const formData = new FormData();
    formData.append('name', supplier.name);

    if (supplier.creationDate){
      formData.append('creationDate', supplier.creationDate.toISOString().split('T')[0]);
    } 

    formData.append('latitude', JSON.stringify(supplier.latitude));
    formData.append('longitude', JSON.stringify(supplier.longitude));

    return formData;
  }
}
