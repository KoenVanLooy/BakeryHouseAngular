import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Klant } from '../_models/klant';

@Injectable({
  providedIn: 'root'
})
export class KlantService {

  constructor(private _http: HttpClient) 
  {}

  getKlanten():Observable<Klant[]>{
    return this._http.get<Klant[]>(environment.apiBaseURI + '/Klant');
  }
}
