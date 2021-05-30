import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from "../_models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) 
  {}

  getOrders():Observable<Order[]>{
    return this._http.get<Order[]>(environment.apiBaseURI + '/order');
  }
  PutOrder(formData){
    return this._http.put(environment.apiBaseURI+'/order/'+ formData.orderId,formData);
  }
  PostOrder(formData){
    return this._http.post(environment.apiBaseURI+'/order',formData);
  }
  DeleteOrder(id){
    return this._http.delete(environment.apiBaseURI+'/order/'+ id);
  }
}
