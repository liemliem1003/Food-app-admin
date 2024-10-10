import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.scss'
})
export class RestaurantDetailComponent {

  listinfo = [
    {
      name: "Total Revenue",
      value: 10000,
      percentage: 10,
      icon: "/assets/Image/RestaurantDetails/TotalRevenueIcon.png"
    },
    {
      name: "Total Dish Ordered",
      value: 10000,
      percentage: -10,
      icon: "/assets/Image/RestaurantDetails/TotalDishOrderedIcon.png"
    },
    {
      name: "Total Customer",
      value: 10000,
      percentage: 10,
      icon: "/assets/Image/RestaurantDetails/TotalCustomerIcon.png"
    }
  ]

  AddCommaToNumber(number: any) {
    number = Number(Number(number).toFixed(2))
    number = number.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(number))
      number = number.replace(pattern, "$1,$2");
    return number;
  }






}
