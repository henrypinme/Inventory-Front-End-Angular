import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryDTO } from '../../categories/categories.models';
import { InventoryListComponent } from "../inventory-list/inventory-list.component";
import { InventorySearchDTO } from './inventory-search.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoriesService } from '../../categories/categories.service';
import { InventoryDTO } from '../inventories.model';
import { InventoriesService } from '../inventories.service';
import { PaginationDTO } from '../../shared/models/PaginationDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-inventories-search',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, InventoryListComponent, MatPaginatorModule],
  templateUrl: './inventories-search.component.html',
  styleUrl: './inventories-search.component.css'
})
export class InventoriesSearchComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  location = inject(Location);
  categoriesService = inject(CategoriesService);
  inventoriesService = inject(InventoriesService);
  pagination: PaginationDTO = {page: 1, recordPerPage: 5};
  totalRecordsCount!: number;

  ngOnInit(): void {

    this.categoriesService.getAll().subscribe(categories => {
      this.categories = categories;

      this.readValuesFromURL();
        this.filterItems(this.form.value as InventorySearchDTO);
        this.form.valueChanges
        .pipe(
          debounceTime(300)
        )
        .subscribe(values => {
          this.filterItems(values as InventorySearchDTO);
          this.wirteParameterInTheURL();
        });
    })


    
  }

  readValuesFromURL(){
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let obj: any = {};

      if (params.itemName){
        obj.itemName = params.itemName;
      }

      if(params.categoryId){
        obj.categoryId = Number(params.categoryId);
      }

      if(params.inStock){
        obj.inStock = params.inStock;
      }

      if(params.outOfStock){
        obj.outOfStock = params.outOfStock;
      }

      this.form.patchValue(obj);

    })
  }

  wirteParameterInTheURL(){
    let queryStrings = [];
    
    const valuesOfForm = this.form.value as InventorySearchDTO;

    if(valuesOfForm.itemName){
      queryStrings.push(`intemName=${encodeURIComponent(valuesOfForm.itemName)}`)
    }

    if(valuesOfForm.categoryId !== 0){
      queryStrings.push(`categoryId=${encodeURIComponent(valuesOfForm.categoryId)}`)
    }

    if(valuesOfForm.inStock){
      queryStrings.push(`inStock=${encodeURIComponent(valuesOfForm.inStock)}`)
    }

    if(valuesOfForm.outOfStock){
      queryStrings.push(`outOfStock=${encodeURIComponent(valuesOfForm.outOfStock)}`)
    }

    this.location.replaceState('inventories/search', queryStrings.join('&'));
  }

  filterItems(values: InventorySearchDTO){
    values.page = this.pagination.page;
    values.recordPerPage = this.pagination.recordPerPage;
    this.inventoriesService.filter(values).subscribe(response => {
      this.inventories = response.body as InventoryDTO[];
      const header = response.headers.get('total-records-count') as string;
      this.totalRecordsCount = parseInt(header, 10);
    })
  }

  handlePagination(data: PageEvent){
    this.pagination = { page: data.pageIndex + 1, recordPerPage: data.pageSize};
    this.filterItems(this.form.value as InventorySearchDTO);
  }

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    itemName: '',
    categoryId: 0,
    inStock: false,
    outOfStock: false
  })

  categories!: CategoryDTO[];
  inventories!: InventoryDTO[];

  clear(){
    this.form.patchValue({
      itemName: '',
      categoryId: 0,
      inStock: false,
      outOfStock: false
    })
  }

}
