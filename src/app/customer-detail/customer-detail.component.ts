import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiserviceComponent } from '../apiservice/apiservice.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent {
  userInfo: any
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
  orderReport: Order[] = []
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
  AddCommaToNumber(number: any) {
    number = Number(Number(number).toFixed(2))
    number = number.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(number))
      number = number.replace(pattern, "$1,$2");
    return number;
  }

  API: any = this.apiService.CustomerAPI()
  constructor(private apiService: ApiserviceComponent, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.API.getCustomerById(params['customerid']).then((data: any) => {
        this.userInfo = data
      })
    })
  }

  UpdateStatus(status: any) {

    if (window.confirm("Would you like to change the status?")) {
      this.API.putChangeUserStatus(status, this.userInfo.id).then((data: any) => {
        window.alert(data.message)
        location.reload()
      })
    }
  }
}



interface Order {
  customer: string;
  menu: string;
  amount: number;
  avatar: string;
  status: string
}