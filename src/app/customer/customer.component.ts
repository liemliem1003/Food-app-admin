import { Component } from '@angular/core';
import { ApiserviceComponent } from '../apiservice/apiservice.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  listCustomers:any
  constructor(private apiService: ApiserviceComponent) { }
  API:any = this.apiService.CustomerAPI()
  ngOnInit() {
    this.API.getAllCustomers("",0,10).then((data:any)=>{
      this.listCustomers = data.content
      console.log(data);
      
    })
  
  }
}
