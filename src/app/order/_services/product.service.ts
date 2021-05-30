import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private _http: HttpClient) 
  {}

  getProducten():Observable<Product[]>{
    return this._http.get<Product[]>(environment.apiBaseURI + '/product');
  }

  
}
