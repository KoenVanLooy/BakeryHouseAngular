import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [OrderListComponent, CreateComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class OrderModule { }
