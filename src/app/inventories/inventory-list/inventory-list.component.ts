import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";
import { MatButtonModule} from '@angular/material/button'
import { MatIconModule} from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import { InventoriesService } from '../inventories.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthorizedComponent } from "../../security/authorized/authorized.component";

@Component({
  selector: 'app-inventory-list',
  imports: [GenericListComponent, MatButtonModule, MatIconModule, RouterLink, SweetAlert2Module, AuthorizedComponent],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {
  
  @Input({required: true})
  inventories!: any[];

  @Output()
  deleted = new EventEmitter<void>();

  inventoriesService = inject(InventoriesService);

  delete(id: number){
    this.inventoriesService.delete(id).subscribe(() => {
      this.deleted.emit();
    })
  }

  
}
