import { Product } from "./product";

export class Orderlijn {
    public orderlijnId: number;
    public productId:number;
    public orderId: number;
    public aantal:number;
    public product:Product;

    constructor(orderlijnId?:number,productId?:number,orderId?: number,aantal?:number, product?:Product){
        this.orderlijnId = orderlijnId
        this.productId = productId;
        this.orderId = orderId;
        this.aantal = aantal;
        this.product = product;
    }
}
