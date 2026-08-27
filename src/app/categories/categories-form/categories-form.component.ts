import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstLetterShouldBeUpperCase } from '../../shared/functions/validations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryCreationDTO, CategoryDTO } from '../categories.models';

@Component({
  selector: 'app-categories-form',
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.css'
})
export class CategoriesFormComponent implements OnInit {
  
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: ['', {validators: [Validators.required, firstLetterShouldBeUpperCase(), Validators.maxLength(50)]}],
    picture: new FormControl<null | File | string>(null)
  });

  @Input()
  model?: CategoryDTO;

  @Output()
  postForm = new EventEmitter<CategoryCreationDTO>(); 

  ngOnInit(): void {
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  getErrorMessagesForName(): string{

    let field = this.form.controls.name;

    if(field.hasError('required'))
    {
      return "The name field is required";
    }

    if(field.hasError('firstLetterShouldBeUpperCase'))
    {
      return field.getError('firstLetterShouldBeUpperCase').message;
    }

    if(field.hasError('maxlength'))
    {
      return `The field Name must not have more than ${field.getError('maxlength').requiredLength} characters`;
    }

    return "";
  } 

  saveChanges(){
    const category = this.form.value as CategoryCreationDTO;

    this.postForm.emit(category);

  }

}


