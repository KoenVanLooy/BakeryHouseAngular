import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Afhaalpunt } from '../_models/afhaalpunt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AfhaalpuntService {

  constructor(private _http: HttpClient) 
  {}

  getAfhaalpunten():Observable<Afhaalpunt[]>{
    return this._http.get<Afhaalpunt[]>(environment.apiBaseURI + '/afhaalpunt');
  }

}
