export interface IcategoryElementRequest {
    name: string;
    path: string;
    imagePath: string;
}

export interface IcategoryElementResponse extends IcategoryElementRequest {
    id: number;
}