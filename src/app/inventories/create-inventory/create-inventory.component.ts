import { Component, inject } from '@angular/core';
import { InventoryCreationDTO } from '../inventories.model';
import { InventoriesFormComponent } from "../inventories-form/inventories-form.component";
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorDTO';
import { SupplierAutoCompleteDTO } from '../../suppliers/suppliers.models';
import { InventoriesService } from '../inventories.service';
import { Router } from '@angular/router';
import { extractErrors } from '../../shared/functions/extractErrors';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-create-inventory',
  imports: [InventoriesFormComponent, LoadingComponent],
  templateUrl: './create-inventory.component.html',
  styleUrl: './create-inventory.component.css'
})
export class CreateInventoryComponent {

  nonSelectedCategories: MultipleSelectorDTO[] = []
  selectedCategories: MultipleSelectorDTO[] = [];
  // suppliersSelected: MultipleSelectorDTO[] = [];
  // nonSelectedSuppliers: MultipleSelectorDTO[] = [];

  selectedSuppliers: SupplierAutoCompleteDTO[] = [];

  inventoriesService = inject(InventoriesService);
  errors: string[] = [];
  router = inject(Router);
  
  constructor(){
    this.inventoriesService.postGet().subscribe(model => {
      this.nonSelectedCategories = model.categories.map(category => {
        return <MultipleSelectorDTO>{key: category.id, description: category.name}
      });

      // this.nonSelectedSuppliers = model.suppliers.map(supplier => {
      //   return <MultipleSelectorDTO>{key: supplier.id, description: supplier.name}
      // });
    })
  }

  // nonSelectedSuppliers: MultipleSelectorDTO[] = [
  //   {key: 1, description: 'Fruit Suppliers'},
  //   {key: 2, description: 'Vegetable Suppliers'},
  //   {key: 3, description: 'Sweets Suppliers'}
  // ]

  // selectedSuppliers: MultipleSelectorDTO[] = [];

  saveChanges(inventory: InventoryCreationDTO){
    this.inventoriesService.create(inventory).subscribe({
      next: () => {
        this.router.navigate(['/']);

      },
      error: err => {
        const errors = extractErrors(err);
        this.errors = errors;
      }
    })
  }

}
