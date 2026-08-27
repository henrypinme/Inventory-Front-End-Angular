import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { InventoriesPutGetDTO, InventoryCreationDTO, InventoryDTO, InventoryPostGetDTO, LandingDTO } from './inventories.model';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  constructor() { }

  private http = inject(HttpClient);
  private baseURL = environment.apiURL + "/inventory";

  public postGet(): Observable<InventoryPostGetDTO>{
    return this.http.get<InventoryPostGetDTO>(`${this.baseURL}/postget`);
  }

  public getLanding(): Observable<LandingDTO>{
    return this.http.get<LandingDTO>(`${this.baseURL}/landing`);
  }

  public getById(id: number): Observable<InventoryDTO>{
    return this.http.get<InventoryDTO>(`${this.baseURL}/${id}`);
  }

  public filter(values: any): Observable<HttpResponse<InventoryDTO[]>>{
    const params = new HttpParams({fromObject: values});
    return this.http.get<InventoryDTO[]>(`${this.baseURL}/filter`, {params, observe: 'response'});
  }

  public create(inventory: InventoryCreationDTO){
    const formData = this.buildFormData(inventory);
    return this.http.post(this.baseURL, formData);

  }

  public putGet(id: number): Observable<InventoriesPutGetDTO>{
    return this.http.get<InventoriesPutGetDTO>(`${this.baseURL}/putget/${id}`);
  }

  public update(id: number, inventory: InventoryCreationDTO){
    const formData = this.buildFormData(inventory);
    return this.http.put(`${this.baseURL}/${id}`, formData);
  }

  public delete(id: number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  private buildFormData(inventory: InventoryCreationDTO): FormData{
    const formData = new FormData();
    formData.append('itemName', inventory.itemName);

    if(inventory.creationDate){
      formData.append('creationDate', inventory.creationDate.toISOString().split('T')[0]);
    }

    if(inventory.poster){
      formData.append('poster', inventory.poster);
    }

    formData.append('itemPrice', JSON.stringify(inventory.itemPrice));
    formData.append('categoriesIds', JSON.stringify(inventory.categoriesIds));
    formData.append('suppliers', JSON.stringify(inventory.suppliers));

    return formData;
  }

}
