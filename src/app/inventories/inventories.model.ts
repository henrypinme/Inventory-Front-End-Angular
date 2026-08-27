import { CategoryDTO } from "../categories/categories.models";
import { SupplierAutoCompleteDTO, SupplierDTO } from "../suppliers/suppliers.models";

export interface InventoryDTO {
    id: number;
    itemName: string;
    itemPrice: number;
    creationDate: Date;
    poster?: string;
    categories?: CategoryDTO[];
    suppliers?: SupplierAutoCompleteDTO[];
}

export interface InventoryCreationDTO {
    itemName: string;
    itemPrice: number;
    creationDate: Date;
    poster?: File;
    categoriesIds?: number[];
    suppliers?: SupplierAutoCompleteDTO[];
    // suppliers?: SupplierAutoCompleteDTO[];
}

export interface InventoryPostGetDTO {
    categories: CategoryDTO[];
    // suppliers: SupplierDTO[];
}

export interface InventoriesPutGetDTO{
    inventory: InventoryDTO;
    selectedCategories: CategoryDTO[];
    nonSelectedCategories: CategoryDTO[];
    suppliers: SupplierAutoCompleteDTO[];
}

export interface LandingDTO {
    outOfStock: InventoryDTO[];
    inStock: InventoryDTO[];
}