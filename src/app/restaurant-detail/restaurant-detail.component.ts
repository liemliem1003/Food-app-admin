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
  restaurantID: any
  paymentInfo = []
  OrderReportPaging: number = 0
  OrderReportCurrPage: number = 0
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
      name: "Cash",
      value: 0,
      percentage: 0,
      icon: "/assets/Image/RestaurantDetails/TotalCustomerIcon.png"
    },
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
    failed: {
      color: "#FFB572",
      bgColor: "#4C3B39",
      text: "Failed"
    }
  }

  popupFilterStatus: boolean = false
  popupUpdateCash: boolean = false



  mostOrder: MostOrder[] = []

  API: any = this.apiService.RestaurantAPI()


  constructor(private apiService: ApiserviceComponent, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      var startDate = new Date();
      var endDate = new Date();
      var dayNum = 7
      this.restaurantID = params['restaurantid']
      startDate.setDate(startDate.getDate() - dayNum);

      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      this.API.getFoodOrderBySupplierForAdmin(this.restaurantID, 0, 10, true, formattedStartDate, formattedEndDate).then((data: any) => {
        console.log(data);
        this.OrderReportPaging = data.totalPages
        for (let item of data.content) {
          if (item.status == "hoàn thành") {
            item.status = "completed"
          } else if (item.status == "đang giao") {
            item.status = "preparing"
          } else if (item.status == "thất bại") {
            item.status = "failed"
          }
          item.order_time = new Date(item.order_time).toISOString().split('T')[0];
          this.orderReport.push(
            {
              customer: item.customer_name,
              menu: "menu 1",
              order_time: item.order_time,
              amount: this.AddCommaToNumber(item.total_price),
              avatar: item.img_url ? item.img_url : "/assets/Image/RestaurantDetails/Avatar.png",
              status: item.status,
              payment_method: item.payment_method,
              payment_status: item.payment_status,
              discount:item.discount
            }
          )
        }
      })
      this.API.getRestaurantById(this.restaurantID).then((data: any) => {
        this.listinfo[2].value = data.cash
        data.payment_information = data.payment_information.split("-")
        this.paymentInfo = data.payment_information
      })
      this.API.getMostOrdered(this.restaurantID, formattedStartDate, formattedEndDate, 10).then((data: any) => {
        this.mostOrder = data
      })

      this.API.getTotalOrdersByRestaurantById(this.restaurantID, formattedEndDate).then((data: any) => {
        this.listinfo[1].value = data.todayOrderCount
        this.listinfo[1].percentage = data.percentageChange
      })

      this.API.getTotalRevenueByRestaurantById(this.restaurantID, formattedEndDate).then((data: any) => {
        this.listinfo[0].value = data.todayRevenue
        this.listinfo[0].percentage = data.percentageChange
      })
    })

  }

  LoadData(page: number) {
    this.orderReport = []
    this.route.queryParams.subscribe(params => {
      var startDate = new Date();
      var endDate = new Date();
      var dayNum = 7
      this.restaurantID = params['restaurantid']
      startDate.setDate(startDate.getDate() - dayNum);

      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      this.API.getFoodOrderBySupplierForAdmin(this.restaurantID, page, 10, true, formattedStartDate, formattedEndDate).then((data: any) => {
        console.log(data);
        
        this.OrderReportPaging = data.totalPages
        console.log(data);
        
        for (let item of data.content) {
          if (item.status == "hoàn thành") {
            item.status = "completed"
          } else if (item.status == "đang giao") {
            item.status = "preparing"
          } else if (item.status == "thất bại") {
            item.status = "failed"
          }
          item.order_time = new Date(item.order_time).toISOString().split('T')[0];
          this.orderReport.push(
            {
              customer: item.customer_name,
              menu: "menu 1",
              order_time: item.order_time,
              amount: this.AddCommaToNumber(item.total_price),
              avatar: item.img_url ? item.img_url : "/assets/Image/RestaurantDetails/Avatar.png",
              status: item.status,
              payment_method: item.payment_method,
              payment_status: item.payment_status,
              discount:item.discount
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

  ShowPopupFilter() {
    this.popupFilterStatus = !this.popupFilterStatus
  }

  ShowPopupUpdateCash() {
    this.popupUpdateCash = !this.popupUpdateCash
  }

  UpdateCash(amount: any) {
    if (amount != 0) {
      if (window.confirm("Would you like to update Cash")) {
        this.API.putUpdateCash(amount, this.restaurantID).then((data: any) => {
          if (data.status == "success") {
            debugger
            window.alert("Amount is updated!")
            location.reload()
          }
        })
      }
    } else {
      window.alert("Input amount!")
    }
  }

  Filter(status: any) {
    this.orderReport = []
    this.route.queryParams.subscribe(params => {
      var startDate = new Date();
      var endDate = new Date();
      var dayNum = 7
      var restaurantID = params['restaurantid']
      startDate.setDate(startDate.getDate() - dayNum);

      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      this.API.getFoodOrderBySupplierForAdmin(restaurantID, 0, 10, true, formattedStartDate, formattedEndDate, status).then((data: any) => {
        for (let item of data.content) {
          if (item.status == "hoàn thành") {
            item.status = "completed"
          } else if (item.status == "đang giao") {
            item.status = "preparing"
          } else if (item.status == "thất bại") {
            item.status = "failed"
          }
          item.order_time = new Date(item.order_time).toISOString().split('T')[0];

          this.orderReport.push(
            {
              customer: item.customer_name,
              menu: "menu 1",
              order_time: item.order_time,
              amount: this.AddCommaToNumber(item.total_price),
              avatar: item.img_url ? item.img_url : "/assets/Image/RestaurantDetails/Avatar.png",
              status: item.status,
              payment_method: item.payment_method,
              payment_status: item.payment_status,
              discount:item.discount
            }
          )
        }
      })
    })
  }

}
interface Order {
  customer: string;
  menu: string;
  amount: number;
  avatar: string;
  status: string;
  payment_method: string;
  order_time: string;
  payment_status: number;
  discount: number

}

interface MostOrder {
  image_url: string;
  food_name: string,
  quantity_sold: number,
}