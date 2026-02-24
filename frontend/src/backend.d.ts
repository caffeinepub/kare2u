import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    description: string;
    productType: ProductType;
    category: Category;
    price: bigint;
}
export enum Category {
    adult = "adult",
    baby = "baby"
}
export enum ProductType {
    conditioner = "conditioner",
    lotion = "lotion",
    shampoo = "shampoo",
    serum = "serum",
    bodyWash = "bodyWash"
}
export interface backendInterface {
    getProducts(): Promise<Array<Product>>;
}
