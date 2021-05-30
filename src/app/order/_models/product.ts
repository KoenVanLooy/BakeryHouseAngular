export class Product {
    public productId:number;
    public naam:string;

    constructor( productId?:number, naam?:string)
    {
        this.productId = productId;
        this.naam = naam;
    }
}
