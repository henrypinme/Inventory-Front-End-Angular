import { Component, inject } from '@angular/core';
import { SuppliersFormComponent } from "../suppliers-form/suppliers-form.component";
import { SupplierCreationDTO } from '../suppliers.models';
import { Router } from '@angular/router';
import { SuppliersService } from '../suppliers.service';
import { extractErrors } from '../../shared/functions/extractErrors';
import { DisplayErrorsComponent } from "../../shared/components/display-errors/display-errors.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CreateEntityComponent } from "../../shared/components/create-entity/create-entity.component";

@Component({
  selector: 'app-create-supplier',
  imports: [CreateEntityComponent],
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.css',
  providers: [{
      provide: CRUD_SERVICE_TOKEN, useClass: SuppliersService
    }]
})
export class CreateSupplierComponent {
  
  suppliersForm = SuppliersFormComponent;

}
