import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiserviceComponent } from '../apiservice/apiservice.component';
import { ActivatedRoute } from '@angular/router';

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

  orderReport:Order[] = []
  orderReportStatus: { [key: string]: { color: string; bgColor: string; text: string } } = {
    completed: {
      color: "#50D1AA",
      bgColor: "#3F7069",
      text: "Completed"
    },
    preparing: {
      color: "#9290FE",
      bgColor: "#363455",
      text: "Preparing"
    },
    pending: {
      color: "#FFB572",
      bgColor: "#4C3B39",
      text: "Pending"
    }
  }

  mostOrder=[
    {
      img:"/assets/Image/RestaurantDetails/Dish.png",
      name:"Spicy seasoned seafood noodles",
      ordered: 80,
    },
    {
      img:"/assets/Image/RestaurantDetails/Dish.png",
      name:"Spicy seasoned seafood noodles",
      ordered: 80,
    },
    {
      img:"/assets/Image/RestaurantDetails/Dish.png",
      name:"Spicy seasoned seafood noodles",
      ordered: 80,
    }
  ]

  API: any = this.apiService.RestaurantAPI()


  constructor(private apiService: ApiserviceComponent, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      var startDate = new Date();
      var endDate = new Date();
      var dayNum = 7

      startDate.setDate(startDate.getDate() - dayNum);

      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      this.API.getFoodOrderBySupplierForAdmin(params['restaurantid'], 0, 10, true, formattedStartDate, formattedEndDate).then((data: any) => {
        console.log(data);
        for (let item of data.content){
          this.orderReport.push(
            {
              customer: item.customer.fullName,
              menu: "menu 1",
              amount: this.AddCommaToNumber(item.total_price),
              avatar: item.customer.imgUrl ? item.customer.imgUrl :"/assets/Image/RestaurantDetails/Avatar.png",
              status: item.status,
            }
          )
        }
      })
    })

  }

  AddCommaToNumber(number: any) {
    number = Number(Number(number).toFixed(2))
    number = number.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(number))
      number = number.replace(pattern, "$1,$2");
    return number;
  }
}
interface Order {
  customer: string;
  menu: string;
  amount: number;
  avatar: string;
  status: string
}