import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatButton, MatAnchor } from "@angular/material/button";
import { CategoriesService } from '../categories.service';
import { CategoryDTO } from '../categories.models';
import { MatTableModule } from '@angular/material/table';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationDTO } from '../../shared/models/PaginationDTO';
import { HttpResponse } from '@angular/common/http';
import { I } from '@angular/cdk/keycodes';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { IndexEntitiesComponent } from "../../shared/components/index-entities/index-entities.component";

@Component({
  selector: 'app-index-categories',
  imports: [IndexEntitiesComponent],
  templateUrl: './index-categories.component.html',
  styleUrl: './index-categories.component.css',
  providers: [ {provide: CRUD_SERVICE_TOKEN, useClass: CategoriesService}]
})
export class IndexCategoriesComponent {
  
}
