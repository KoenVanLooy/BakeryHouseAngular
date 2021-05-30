import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray, Validators, FormGroup } from '@angular/forms';
import { ApplistService } from '../Services/applist.service';

@Component({
  selector: 'app-applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.css']
})
export class ApplistComponent implements OnInit {

  orderForms : FormArray = this.fb.array([]);
  orderList: [];
  notification = null;
  constructor(private fb: FormBuilder,private orderService: ApplistService) { }

  ngOnInit(): void {
    this.orderService.getOrderList().subscribe(res => this.orderList = res as []);
    
    this.orderService.getOrderList().subscribe(
      res => {
        if(res == []){
          this.addOrderForm();
        }else{
          (res as []).forEach( (order : any)=>{
            this.orderForms.push(this.fb.group({
              orderId : [order.orderId],
              afhaalpuntId:[order.afhaalpuntId,Validators.min(1)],
              orderDatum:[order.orderDatum,Validators.required],
              leverDatum:[order.leverDatum,Validators.required],
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
      orderDatum:[new Date,Validators.required],
      leverDatum:[new Date,Validators.required],
      klantId:[0,Validators.min(1)]

    }));
  }

  recordSubmit(fg:FormGroup){
    if(fg.value.orderId==0)
    this.orderService.PostOrder(fg.value).subscribe(
      (res :any )=>{
        fg.patchValue({orderId:res.orderId});
        this.showNotification('insert');
      }
    );
    else
    this.orderService.PutOrder(fg.value).subscribe(
      (res :any )=>{
        this.showNotification('update');
      }
    );
  }
  onDelete(orderId,i){
    if(orderId == 0)
      this.orderForms.removeAt(i);
    else if(confirm('are you sure to delete this record ?'))
      this.orderService.DeleteOrder(orderId).subscribe(res => {
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