import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray, Validators, FormGroup } from '@angular/forms';
import { Afhaalpunt } from '../_models/afhaalpunt';
import { Order } from "../_models/order";
import { AfhaalpuntService } from '../_services/afhaalpunt.service';
import { OrderService } from '../_services/order.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public Orders: Order[];
  public Afhaalpunten: Afhaalpunt[];
  orderForms : FormArray = this.fb.array([]);
  notification = null;
  constructor(private fb: FormBuilder, private _orderService:OrderService, private _afhaalpuntService:AfhaalpuntService) 
  { 

  }

  ngOnInit(): void {
    this._orderService.getOrders().subscribe((results) => this.Orders = results);
    this._afhaalpuntService.getAfhaalpunten().subscribe((results)=> this.Afhaalpunten = results);

    this._orderService.getOrders().subscribe(
      res => {
        if(res == []){
          this.addOrderForm();
        }else{
          (res as []).forEach( (order : Order)=>{
            let leverDate = order.leverDatum.split('T')[0];
            let orderDate = order.orderdatum.split('T')[0];
            this.orderForms.push(this.fb.group({
              orderId : [order.orderId],
              afhaalpuntId:[order.afhaalpuntId,Validators.min(1)],
              orderDatum:[orderDate,Validators.required],
              leverDatum:[leverDate,Validators.required],
              klantId:[order.klantId,Validators.required]
            }));
          });
        }
      }
    );
  }

  addOrderForm(){
    this.orderForms.push(this.fb.group({
      orderId : [0],
      afhaalpuntId:[0,Validators.min(1)],
      orderDatum:['',Validators.required],
      leverDatum:['',Validators.required],
      klantId:['',Validators.min(1)]

    }));
  }

  recordSubmit(fg:FormGroup){
    if(fg.value.orderId==0)
    this._orderService.PostOrder(fg.value).subscribe(
      (res :any )=>{
        fg.patchValue({orderId:res.orderId});
        this.showNotification('insert');
      }
    );
    else
    this._orderService.PutOrder(fg.value).subscribe(
      (res :any )=>{
        this.showNotification('update');
      }
    );
  }
  onDelete(orderId,i){
    if(orderId == 0)
      this.orderForms.removeAt(i);
    else if(confirm('are you sure to delete this record ?'))
      this._orderService.DeleteOrder(orderId).subscribe(res => {
        this.orderForms.removeAt(i);
        this.showNotification('delete');
      });
  }
  showNotification(category){
    switch (category) {
      case 'insert':
        this.notification = {class:'text-success', message:'saved'};
        break;
        case 'update':
        this.notification = {class:'text-primary', message:'updated'};
        break;
        case 'delete':
        this.notification = {class:'text-danger', message:'deleted'};
        break;
      default:
        break;
    }
    setTimeout(()=>{this.notification = null},3000);
  }
}
