import { AfterViewInit, Component, ComponentRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { DisplayErrorsComponent } from "../display-errors/display-errors.component";
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { ICRUDService } from '../../interfaces/ICRUDService';
import { Router } from '@angular/router';
import { extractErrors } from '../../functions/extractErrors';

@Component({
  selector: 'app-create-entity',
  imports: [DisplayErrorsComponent],
  templateUrl: './create-entity.component.html',
  styleUrl: './create-entity.component.css'
})
export class CreateEntityComponent<TDTO, TCreationDTO> implements AfterViewInit {
  
  errors: string[] = [];
  CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDService<TDTO, TCreationDTO>;
  router = inject(Router);

  @Input({required: true})
  title!: string;

  @Input({required: true})
  indexRoute!: string;

  @Input({required: true})
  formComponent: any;

  @ViewChild("contentForm", {read: ViewContainerRef})
  contentForm!: ViewContainerRef;
  private componenRef!: ComponentRef<any>;

  ngAfterViewInit(): void {
    this.componenRef = this.contentForm.createComponent(this.formComponent);
    this.componenRef.instance.postForm.subscribe((model: TCreationDTO) => {
      this.saveChanges(model);

    })
  }

  saveChanges(entity: TCreationDTO){
    this.CRUDService.create(entity).subscribe({
      next: () => {
        this.router.navigate([this.indexRoute]);
      },
      error: err => {
        const errors = extractErrors(err);
        this.errors = errors;

      }
    });
  }

}
