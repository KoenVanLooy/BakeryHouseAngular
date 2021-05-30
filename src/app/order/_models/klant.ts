export class Klant {
    public klantId:number;
    public voornaam:string;

    constructor( klantId?:number, voornaam?:string)
    {
        this.klantId = klantId;
        this.voornaam = voornaam;
    }

}
