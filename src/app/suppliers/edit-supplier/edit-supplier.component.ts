import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { SupplierCreationDTO, SupplierDTO } from '../suppliers.models';
import { SuppliersFormComponent } from "../suppliers-form/suppliers-form.component";
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { DisplayErrorsComponent } from '../../shared/components/display-errors/display-errors.component';
import { SuppliersService } from '../suppliers.service';
import { Router } from '@angular/router';
import { extractErrors } from '../../shared/functions/extractErrors';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { EditEntityComponent } from "../../shared/components/edit-entity/edit-entity.component";

@Component({
  selector: 'app-edit-supplier',
  imports: [EditEntityComponent],
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.css',
  providers: [{
      provide: CRUD_SERVICE_TOKEN, useClass: SuppliersService
    }]
})
export class EditSupplierComponent {

  @Input({transform: numberAttribute})
  id!: number;
  suppliersForm = SuppliersFormComponent;

}
