import { IcategoryElementResponse } from "../categories/categories.categories";

export interface IProductRequest {
    category: IcategoryElementResponse;
    name: string;
    path: string;
    description: string;
    weight: string;
    price: number;
    imagePath: string;
    count: number;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}
