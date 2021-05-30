export class Afhaalpunt {
    public afhaalpuntId:number;
    public omschrijving:string;
    public adres:string;
    public postcode:string;
    public stad:string;

    constructor( afhaalpuntId?:number, omschrijving?:string,adres?:string, postcode?:string,stad?:string)
    {
        this.afhaalpuntId = afhaalpuntId;
        this.omschrijving = omschrijving;
        this.adres = adres;
        this.postcode = postcode;
        this.stad = stad;
    }
}
