import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { transform } from 'typescript';
import { InventoryDTO } from '../inventories.model';
import { InventoriesService } from '../inventories.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { MapComponent } from "../../shared/components/map/map.component";
import { Coordinate } from '../../shared/components/map/Coordinates.model';

@Component({
  selector: 'app-inventory-details',
  imports: [LoadingComponent, MatChipsModule, RouterLink, MapComponent],
  templateUrl: './inventory-details.component.html',
  styleUrl: './inventory-details.component.css'
})
export class InventoryDetailsComponent implements OnInit {
  
  @Input({transform: numberAttribute})
  id!: number;

  inventory!: InventoryDTO;
  coordinates: Coordinate[] = [];
  inventoriesService = inject(InventoriesService);

  ngOnInit(): void {
    this.inventoriesService.getById(this.id).subscribe(inventory => {
      this.inventory = inventory;
      inventory.creationDate = new Date(inventory.creationDate);
      if(inventory.suppliers){
        this.coordinates = inventory.suppliers.map(supplier => {
          return {latitude: supplier.latitude, longitude: supplier.longitude, text: supplier.name}
        });
      }      
    })
  }

}
