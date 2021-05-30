import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray, Validators, FormGroup } from '@angular/forms';
import { Afhaalpunt } from '../_models/afhaalpunt';
import { Klant } from '../_models/klant';
import { Order } from "../_models/order";
import { AfhaalpuntService } from '../_services/afhaalpunt.service';
import { KlantService } from '../_services/klant.service';
import { OrderService } from '../_services/order.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';
import { Orderlijn } from '../_models/orderlijn';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public Orders: Order[];
  public Afhaalpunten: Afhaalpunt[];
  public Klanten: Klant[];
  public Producten: Product[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  orderForms : FormArray = this.fb.array([]);
  notification = null;
  constructor(private fb: FormBuilder, private _orderService:OrderService, private _afhaalpuntService:AfhaalpuntService, 
    private _klantService:KlantService, private _productService:ProductService) 
  { 
  }

  ngOnInit(): void {
    this._orderService.getOrders().subscribe((results) => this.Orders = results);
    this._afhaalpuntService.getAfhaalpunten().subscribe((results)=> this.Afhaalpunten = results);
    this._klantService.getKlanten().subscribe((results) => this.Klanten = results);
    this._productService.getProducten().subscribe((results) => this.Producten = results);
    
    this._orderService.getOrders().subscribe(
      res => {
        if(res == []){
          this.addOrderForm();
        }else{
          (res as []).forEach( (order : Order)=>{
            let leverDate = order.leverDatum.split('T')[0];
            let orderDate = order.orderdatum.split('T')[0];
            let selectedProduct = [];
            order.orderlijnen.forEach((orderlijn:Orderlijn)=>{selectedProduct.push(orderlijn.product)});
            
            this.orderForms.push(this.fb.group({
              orderId : [order.orderId],
              afhaalpuntId:[order.afhaalpuntId,Validators.min(1)],
              orderDatum:[orderDate,Validators.required],
              leverDatum:[leverDate,Validators.required],
              klantId:[order.klantId,Validators.required],
              orderlijnen:[selectedProduct]
            }));
          });
        }
      }
    );

    this.dropdownList = this.Producten;
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'productId',
      textField: 'naam',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  addOrderForm(){
    this.orderForms.push(this.fb.group({
      orderId : [0],
      afhaalpuntId:[0,Validators.min(1)],
      orderDatum:['',Validators.required],
      leverDatum:['',Validators.required],
      klantId:[0,Validators.min(1)],
      orderlijnen:[]
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

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeselect(item: any){
    console.log(item);
  }
}
