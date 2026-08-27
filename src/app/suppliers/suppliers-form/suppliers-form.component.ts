import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierCreationDTO, SupplierDTO } from '../suppliers.models';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { dateCannotBeInTheFuture } from '../../shared/functions/validations';
import { MapComponent } from "../../shared/components/map/map.component";
import { Coordinate } from '../../shared/components/map/Coordinates.model';

@Component({
  selector: 'app-suppliers-form',
  imports: [ReactiveFormsModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, MatDatepickerModule, MapComponent],
  templateUrl: './suppliers-form.component.html',
  styleUrl: './suppliers-form.component.css'
})
export class SuppliersFormComponent implements OnInit {
  
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: ['', {validators: [Validators.required]}],
    creationDate: new FormControl<Date | null>(null, {validators: [Validators.required, dateCannotBeInTheFuture()]}),
    coordinate: new FormControl<Coordinate | null>(null, {validators: [Validators.required]})
  })

  @Input()
  model?: SupplierDTO;

  initialCoordinate: Coordinate[] = [];

  @Output()
  postForm = new EventEmitter<SupplierCreationDTO>();

  ngOnInit(): void {
    if(this.model !== undefined){
      this.form.patchValue(this.model);
      const coordinate: Coordinate = {latitude: this.model.latitude, longitude: this.model.longitude};
      this.form.controls.coordinate.setValue(coordinate);
      this.initialCoordinate.push(coordinate);
    }
  }

  getErrorMessagesForName(): string{

    let field = this.form.controls.name;

    if(field.hasError('required'))
    {
      return "The name field is required";
    }
    
    return "";
  }

  getErrorMessagesForDateOfCreation(): string{

    let field = this.form.controls.creationDate;

    if(field.hasError('required'))
    {
      return "The date of creation is required";
    }
    
    if(field.hasError('dateCannotBeInTheFuture')){
      return field.getError('dateCannotBeInTheFuture').message;
    }
    
    return "";
  }

  handleCoordinateSelection(coordinate: Coordinate){
    this.form.controls.coordinate.setValue(coordinate);
  }

  saveChanges(){
    const supplier = this.form.value as SupplierCreationDTO;

    supplier.creationDate = moment(supplier.creationDate).toDate();

    supplier.latitude = this.form.controls.coordinate.value?.latitude as number;
    supplier.longitude = this.form.controls.coordinate.value?.longitude as number;
    
    this.postForm.emit(supplier);
  }

}
