import { Component, inject } from '@angular/core';
import { InventoryListComponent } from "../inventories/inventory-list/inventory-list.component";
import { InventoriesService } from '../inventories/inventories.service';
import { AuthorizedComponent } from "../security/authorized/authorized.component";

@Component({
  selector: 'app-landing-page',
  imports: [InventoryListComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  inStock: any;
  outOfStock: any;

  inventoryService = inject(InventoriesService);

  constructor(){
    this.loadInventory();
  }

  loadInventory(){
    this.inventoryService.getLanding().subscribe(response => {
      this.inStock = response.inStock;
      this.outOfStock = response.outOfStock;
    });
  }

  handleDelete(){
    this.loadInventory();
  }

}
