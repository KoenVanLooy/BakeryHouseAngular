export class Order {
    public orderId:number;
    public klantId:number;
    public afhaalpuntId:number;
    public orderdatum:string;
    public leverDatum:string;

    constructor( orderId?:number, klantId?:number,afhaalpuntId?:number, orderdatum?:string,leverDatum?:string)
    {
        this.afhaalpuntId = afhaalpuntId;
        this.klantId = klantId;
        this.orderId = orderId;
        this.leverDatum = leverDatum;
        this.orderdatum = orderdatum;
    }

}
