import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { InventoryCreationDTO, InventoryDTO } from '../inventories.model';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InputImgComponent } from '../../shared/components/input-img/input-img.component';
import { MultipleSelectorComponent } from "../../shared/components/multiple-selector/multiple-selector.component";
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorDTO';
import { SuppliersAutocompleteComponent } from "../../suppliers/suppliers-autocomplete/suppliers-autocomplete.component";
import { SupplierAutoCompleteDTO } from '../../suppliers/suppliers.models';

@Component({
  selector: 'app-inventories-form',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MatDatepickerModule, InputImgComponent, MultipleSelectorComponent, SuppliersAutocompleteComponent],
  templateUrl: './inventories-form.component.html',
  styleUrl: './inventories-form.component.css'
})
export class InventoriesFormComponent implements OnInit {

  @Input()
  model?: InventoryDTO;

  @Output()
  postForm = new EventEmitter<InventoryCreationDTO>();

  @Input({required: true})
  selectedCategories!: MultipleSelectorDTO[];

  @Input({required: true})
  nonSelectedCategories!: MultipleSelectorDTO[];

  @Input({required: true})
  selectedSuppliers!: SupplierAutoCompleteDTO[];

  // @Input({required: true})
  // nonSelectedSuppliers!: MultipleSelectorDTO[];

  // @Input({required: true})
  // selectedSuppliers!: MultipleSelectorDTO[];

  // @Input({required: true})
  // nonSelectedSuppliers!: MultipleSelectorDTO[];

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    itemName: ['', {validator: [Validators.required]}],
    itemPrice: [0, {validator: [Validators.required]}],
    creationDate: new FormControl<Date | null>(null),
    poster: new FormControl<File | string | null>(null)
  });

  ngOnInit(): void {
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  handleFileSelection(file:File){
    this.form.controls.poster.setValue(file);
  }

  getErrorMessagesForItemName(): string{
    const field = this.form.controls.itemName;

    if(field.hasError('required')){
      return "The Item Name is required";
    }

    return "";
  }

  saveChanges(){
    const inventory = this.form.value as InventoryCreationDTO;

    if(inventory.creationDate){
      inventory.creationDate = moment(inventory.creationDate).toDate();
    }

    if(typeof inventory.poster === 'string'){
      inventory.poster = undefined;
    }

    inventory.itemPrice = Number(inventory.itemPrice);

    const categoriesIds = this.selectedCategories.map(val => val.key);
    inventory.categoriesIds = categoriesIds;

    inventory.suppliers = this.selectedSuppliers;

    // const suppliersIds = this.selectedSuppliers.map(val => val.key);
    // inventory.suppliersIds = suppliersIds;   

    this.postForm.emit(inventory);
  }

}
