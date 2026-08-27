export interface SupplierDTO{
    id: number;
    name: string;
    creationDate: Date;
    latitude: number;
    longitude: number
}

export interface SupplierCreationDTO{
    name: string;
    creationDate: Date;
    latitude: number;
    longitude: number
}

export interface SupplierAutoCompleteDTO{
    id: number;
    name: string;
    latitude: number;
    longitude: number
    // supplierAddress: string;
}

