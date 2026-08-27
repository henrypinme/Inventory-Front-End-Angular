import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IndexCategoriesComponent } from './categories/index-categories/index-categories.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { IndexSuppliersComponent } from './suppliers/index-suppliers/index-suppliers.component';
import { CreateSupplierComponent } from './suppliers/create-supplier/create-supplier.component';
import { CreateInventoryComponent } from './inventories/create-inventory/create-inventory.component';
import { EditInventoryComponent } from './inventories/edit-inventory/edit-inventory.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { EditSupplierComponent } from './suppliers/edit-supplier/edit-supplier.component';
import { InventoriesSearchComponent } from './inventories/inventories-search/inventories-search.component';
import { InventoryDetailsComponent } from './inventories/inventory-details/inventory-details.component';
import { isAdminGuard } from './shared/guards/is-admin.guard';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { IndexUsersComponent } from './security/index-users/index-users.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },

    { path: 'categories', component: IndexCategoriesComponent, canActivate: [isAdminGuard] },
    { path: 'categories/create', component: CreateCategoryComponent, canActivate: [isAdminGuard] },
    { path: 'categories/edit/:id', component: EditCategoryComponent, canActivate: [isAdminGuard] },

    { path: 'suppliers', component: IndexSuppliersComponent, canActivate: [isAdminGuard] },
    { path: 'suppliers/create', component: CreateSupplierComponent, canActivate: [isAdminGuard] },
    { path: 'suppliers/edit/:id', component: EditSupplierComponent, canActivate: [isAdminGuard] },

    { path: 'inventories/search', component: InventoriesSearchComponent },
    { path: 'inventories/create', component: CreateInventoryComponent, canActivate: [isAdminGuard] },
    { path: 'inventories/edit/:id', component: EditInventoryComponent, canActivate: [isAdminGuard] },
    { path: 'inventories/:id', component: InventoryDetailsComponent},

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'users', component: IndexUsersComponent },

    { path: '**', redirectTo: ''}
];
