import { Orderlijn } from "./orderlijn";

export class Order {
    public orderId:number;
    public klantId:number;
    public afhaalpuntId:number;
    public orderdatum:string;
    public leverDatum:string;
    public orderlijnen:Orderlijn[];

    constructor( orderId?:number, klantId?:number,afhaalpuntId?:number, orderdatum?:string,leverDatum?:string,orderlijnen?:Orderlijn[])
    {
        this.afhaalpuntId = afhaalpuntId;
        this.klantId = klantId;
        this.orderId = orderId;
        this.leverDatum = leverDatum;
        this.orderdatum = orderdatum;
        this.orderlijnen = orderlijnen;
    }

}
