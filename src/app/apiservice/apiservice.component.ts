import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root' // This makes the service available globally
})
@Component({
  selector: 'app-apiservice',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet],
  templateUrl: './apiservice.component.html',
  styleUrl: './apiservice.component.css'
})
export class ApiserviceComponent {
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  httpRequest: any = this.http
  private apiUrl = 'http://14.225.206.203:8080/api/v1/';
  apiToken = this.cookieService.get('loginToken')
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`,
    })
  };
  LoginAPI(credentials: any) {
    const HTTPRequest = this.http;
    const api = this.apiUrl + "users/login"
    return HTTPRequest.post(api, credentials).toPromise();
  }
  DashboardAPI() {
    const HTTPRequest = this.http;
    return {
      getRevenueByDate: (date: String) => {
        var str = "report/get_revenue_by_date?date="
        const api = this.apiUrl + str + date
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      getUserCountByDate: (date: String) => {
        var str = "report/get_user_count_by_date?date="
        const api = this.apiUrl + str + date
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      getOrderCountByDate: (date: String) => {
        var str = "report/get_order_count_by_date?date="
        const api = this.apiUrl + str + date
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      getProductSoldByDate: (date: String) => {
        var str = "report/get_product_sold_by_date?date="
        const api = this.apiUrl + str + date
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      getRevenueByDateRangeForAdmin: (startDate: String, endDate: String) => {
        var str = "report/get_revenue_by_date_range_for_admin?"
        startDate = "startDate=" + startDate
        endDate = "endDate=" + endDate
        const api = this.apiUrl + str + startDate + "&" + endDate
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      get_top_products: (limit: number) => {
        var str = "report/get_top_supplier_by_orders_for_admin?limit="
        const api = this.apiUrl + str + limit
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      }
    }
  }
  RestaurantAPI() {
    const HTTPRequest = this.http;
    return {
      getAllRestaurants: (keyword: string, page: number, limit: number) => {
        var str = "supplier_info/get_all_suppliers?"
        const api = this.apiUrl + str + `limit=${limit}&$page=${page}`
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      getRestaurantById: (id: any) => {
        var str = "supplier_info/get_supplier_by_id/"
        const api = this.apiUrl + str + id
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      getFoodOrderBySupplierForAdmin: (id: any, page: any = 0, limit: any = 5, desc: boolean, startDate: string, endDate: string) => {
        var str = "food_orders/get_food_order_by_supplier_for_admin/"
        var api = this.apiUrl + str + `${id}?page=${page}&size=${limit}&sortBy=orderTime&sortDirection=${desc ? "desc" : "acs"}&startDate=${startDate}&endDate=${endDate}`
        return HTTPRequest.get(api, this.httpOptions).toPromise();

      },
      getMostOrdered:(id:any,startDate:any,endDate:any,limit:any = 5) => {
        var str = "report/top_selling_food_item/"
        var api = this.apiUrl + str + `${id}?startDate=${startDate}&endDate=${endDate}&limit=${limit}`
        return HTTPRequest.get(api, this.httpOptions).toPromise();

      },
      getTotalOrdersByRestaurantById: (id:any,date:string) => {
        console.log(date);
        
        var str = "report/get_order_count_by_date_for_partner/"
        var api = this.apiUrl + str + `${id}?date=${date}`
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      getTotalRevenueByRestaurantById: (id:any,date:string) => {
        console.log(date);
        
        var str = "report/get_revenue_by_date_for_partner/"
        var api = this.apiUrl + str + `${id}?date=${date}`
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      }
    }
  }
  CustomerAPI() {
    const HTTPRequest = this.http;
    return {
      getAllCustomers: (keyword: string, page: number, limit: number) => {
        var str = "users/get_user_by_role/3?"
        const api = this.apiUrl + str + `limit=${limit}&$page=${page}&keyword=${keyword}`
        // const api = this.apiUrl + str + `limit=${limit}&$page=${page}&keyword=123123`
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      getCustomerById: (id:any) =>{
        var str = "users/get_user_by_id/"
        const api = this.apiUrl + str + id
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      putChangeUserStatus: (status:any, id:any) =>{
        var str = "users/block/"
        const api = this.apiUrl + str + id + "/" + status
        return HTTPRequest.put(api, {},this.httpOptions).toPromise();
      }
    }
  }
}
