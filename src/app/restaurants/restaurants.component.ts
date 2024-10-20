import { Component } from '@angular/core';
import { ApiserviceComponent } from '../apiservice/apiservice.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss'
})
export class RestaurantsComponent {
  listRestaurants:any
  constructor(private apiService: ApiserviceComponent) { }
  API:any = this.apiService.RestaurantAPI()
  ngOnInit() {
    this.API.getAllRestaurants("",0,10).then((data:any)=>{
      console.log(data);
      this.listRestaurants = data
    })
  
  }
  NumberToFixed(number: number) {
    return Number(Number(number).toFixed(0))
  }
}
