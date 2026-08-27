import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { SupplierAutoCompleteDTO } from '../suppliers.models';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { SuppliersService } from '../suppliers.service';

@Component({
  selector: 'app-suppliers-autocomplete',
  imports: [MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule, MatIconModule,
    FormsModule, MatTableModule, MatInputModule, DragDropModule
  ],
  templateUrl: './suppliers-autocomplete.component.html',
  styleUrl: './suppliers-autocomplete.component.css'
})
export class SuppliersAutocompleteComponent implements OnInit {

  suppliersService = inject(SuppliersService);
  
  suppliers: SupplierAutoCompleteDTO[] = [];

  // suppliersOriginal = this.suppliers;

  @Input({required: true})
  suppliersSelected: SupplierAutoCompleteDTO[] = [];
  
  control = new FormControl();

  columnsToDisplay = ['name', 'actions'];

  @ViewChild(MatTable)
  table!: MatTable<SupplierAutoCompleteDTO>;



  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => {
      if(typeof value === "string" && value){
        this.suppliersService.getByName(value).subscribe(suppliers => {
          this.suppliers = suppliers;
        });
      }
      // this.suppliers = this.suppliersOriginal;
      // this.suppliers = this.suppliers.filter(supplier => supplier.name.indexOf(value) !== -1);
    })
  }

 handleSelection(event: MatAutocompleteSelectedEvent){
    this.suppliersSelected.push(event.option.value);
    this.control.patchValue('');
    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  delete(supplier: SupplierAutoCompleteDTO){
    const index = this.suppliersSelected.findIndex((s: SupplierAutoCompleteDTO) => s.id === supplier.id);
    this.suppliersSelected.splice(index, 1);
    this.table.renderRows();
  }

  handleDrop(event: CdkDragDrop<any[]>){
    const previousIndex = this.suppliersSelected.findIndex(supplier => supplier === event.item.data);
    moveItemInArray(this.suppliersSelected, previousIndex, event.currentIndex);
    this.table.renderRows();
  }

}
