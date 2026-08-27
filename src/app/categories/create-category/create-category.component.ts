import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryCreationDTO } from '../categories.models';
import { CategoriesFormComponent } from "../categories-form/categories-form.component";
import { CategoriesService } from '../categories.service';
import { extractErrors } from '../../shared/functions/extractErrors';
import { DisplayErrorsComponent } from "../../shared/components/display-errors/display-errors.component";
import { CreateEntityComponent } from "../../shared/components/create-entity/create-entity.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';

@Component({
  selector: 'app-create-category',
  imports: [CreateEntityComponent],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
  providers: [{
    provide: CRUD_SERVICE_TOKEN, useClass: CategoriesService
  }]
})
export class CreateCategoryComponent {

  categoryForm = CategoriesFormComponent;

}
