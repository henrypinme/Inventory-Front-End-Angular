import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { InventoryCreationDTO, InventoryDTO } from '../inventories.model';
import { InventoriesFormComponent } from "../inventories-form/inventories-form.component";
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorDTO';
import { SupplierAutoCompleteDTO } from '../../suppliers/suppliers.models';
import { InventoriesService } from '../inventories.service';
import { extractErrors } from '../../shared/functions/extractErrors';
import { Router } from '@angular/router';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-edit-inventory',
  imports: [InventoriesFormComponent, LoadingComponent],
  templateUrl: './edit-inventory.component.html',
  styleUrl: './edit-inventory.component.css'
})
export class EditInventoryComponent implements OnInit {

  @Input({transform: numberAttribute})
  id!: number;

  model?: InventoryDTO;

  nonSelectedCategories: MultipleSelectorDTO[] = []
  selectedCategories: MultipleSelectorDTO[] = [];
  selectedSuppliers: SupplierAutoCompleteDTO[] = [];
  errors: string[] = [];
  
  inventoriesService = inject(InventoriesService);
  router = inject(Router);

  ngOnInit(): void {
    this.inventoriesService.putGet(this.id).subscribe(response => {
      this.model = response.inventory;

      this.selectedCategories = response.selectedCategories.map(category => {
        return <MultipleSelectorDTO>{key: category.id, description: category.name}
      });

      this.nonSelectedCategories = response.nonSelectedCategories.map(category => {
        return <MultipleSelectorDTO>{key: category.id, description: category.name}
      });

      this.selectedSuppliers = response.suppliers;
    })
  }

    // suppliersSelected: MultipleSelectorDTO[] = [];

    // nonSelectedSuppliers: MultipleSelectorDTO[] = []

  //   nonSelectedSuppliers: MultipleSelectorDTO[] = [
  //   {key: 1, description: 'Fruit Suppliers'},
  //   {key: 2, description: 'Vegetable Suppliers'}
  // ]

  // selectedSuppliers: MultipleSelectorDTO[] = [
  //   {key: 3, description: 'Sweets Suppliers'}
  // ];

  saveChanges(inventory: InventoryCreationDTO){
    this.inventoriesService.update(this.id, inventory).subscribe({
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
