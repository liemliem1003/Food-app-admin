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
  paging={
    currPage:0,
    numberOfPage:0,
    limit:10
  }
  constructor(private apiService: ApiserviceComponent) { }
  API:any = this.apiService.CustomerAPI()
  ngOnInit() {
    this.LoadData(this.paging.currPage)
  }
  LoadData(page:number){
    this.paging.currPage = page
    this.API.getAllCustomers("",page,this.paging.limit).then((data:any)=>{
      this.listCustomers = data.content
      this.paging.numberOfPage=data.totalPages
    })
  }
}
