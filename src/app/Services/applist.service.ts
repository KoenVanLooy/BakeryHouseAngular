import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApplistService {

  constructor(private http : HttpClient) { }

  getOrderList(){
    return this.http.get(environment.apiBaseURI+'/order');
  }

  PutOrder(formData){
    return this.http.put(environment.apiBaseURI+'/order/'+ formData.orderId,formData);
  }
  PostOrder(formData){
    return this.http.post(environment.apiBaseURI+'/order',formData);
  }
  DeleteOrder(id){
    return this.http.delete(environment.apiBaseURI+'/order/'+ id);
  }
}

