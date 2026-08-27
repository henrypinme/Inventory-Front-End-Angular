import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { CategoryCreationDTO, CategoryDTO } from '../categories.models';
import { CategoriesFormComponent } from "../categories-form/categories-form.component";
import { CategoriesService } from '../categories.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { extractErrors } from '../../shared/functions/extractErrors';
import { DisplayErrorsComponent } from "../../shared/components/display-errors/display-errors.component";
import { Router } from '@angular/router';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { EditEntityComponent } from "../../shared/components/edit-entity/edit-entity.component";

@Component({
  selector: 'app-edit-category',
  imports: [EditEntityComponent],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
  providers: [{
    provide: CRUD_SERVICE_TOKEN, useClass: CategoriesService
  }]
})
export class EditCategoryComponent {
   
  @Input({transform: numberAttribute})
  id!: number;
  categoryForm = CategoriesFormComponent;
  

}
