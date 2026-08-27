export interface InventorySearchDTO {
    itemName: string;
    categoryId: number;
    inStock: boolean;
    outOfStock: boolean;
    page: number;
    recordPerPage: number;
} 