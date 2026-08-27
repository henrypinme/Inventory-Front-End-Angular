import { Component, inject } from '@angular/core';
import { MatAnchor, MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from '@angular/router';
import { SuppliersService } from '../suppliers.service';
import { SupplierDTO } from '../suppliers.models';
import { PaginationDTO } from '../../shared/models/PaginationDTO';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatTableModule } from '@angular/material/table';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { IndexEntitiesComponent } from "../../shared/components/index-entities/index-entities.component";

@Component({
  selector: 'app-index-suppliers',
  imports: [MatTableModule, MatPaginatorModule, SweetAlert2Module, IndexEntitiesComponent],
  templateUrl: './index-suppliers.component.html',
  styleUrl: './index-suppliers.component.css',
  providers: [ {provide: CRUD_SERVICE_TOKEN, useClass: SuppliersService}]
})
export class IndexSuppliersComponent {
 
}
