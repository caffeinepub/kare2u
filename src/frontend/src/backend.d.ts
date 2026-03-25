import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AddInquiryArgs {
    customerName: string;
    customerPhone: string;
    guestCount: bigint;
    message: string;
    customerEmail: string;
    packageId: string;
    eventDate: string;
    eventType: string;
}
export interface Package {
    id: string;
    name: string;
    description: string;
    price: bigint;
}
export interface Inquiry {
    id: bigint;
    customerName: string;
    customerPhone: string;
    guestCount: bigint;
    message: string;
    timestamp: bigint;
    customerEmail: string;
    packageId: string;
    eventDate: string;
    eventType: string;
}
export interface backendInterface {
    addInquiry(args: AddInquiryArgs): Promise<bigint>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllPackages(): Promise<Array<Package>>;
    getInquiries(): Promise<Array<Inquiry>>;
    getInquiry(_id: bigint): Promise<Inquiry | null>;
}
