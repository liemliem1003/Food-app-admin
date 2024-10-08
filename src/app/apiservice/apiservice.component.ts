import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';


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
  constructor(private http: HttpClient) {
  }
  httpRequest: any = this.http
  private apiUrl = 'http://14.225.206.203:8080/api/v1/';
  apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjp7ImlkIjoxLCJuYW1lIjoiQWRtaW4ifSwidXNlcklkIjoxLCJlbWFpbCI6ImFkbWluMkBnbWFpbC5jb20iLCJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiZXhwIjoxNzMwODk2MzMxfQ.DKGjiB1HQg5JCFrX5Tsx_tRpbRw8uKvLDbrMidhyUOs"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`,
    })
  };
  LoginAPI(credentials:any){
    const HTTPRequest = this.http;
    const api = this.apiUrl + "users/login"
    return HTTPRequest.post(api, credentials ,this.httpOptions).toPromise();
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
        startDate = "startDate="+startDate
        endDate = "endDate=" + endDate
        const api = this.apiUrl + str + startDate + "&" + endDate
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
    }
  }
  RestaurantAPI(){
    const HTTPRequest = this.http;
    return {
      getAllRestaurants: (keyword:string, page:number, limit:number) => {
        var str = "supplier_info/get_all_suppliers?"
        const api = this.apiUrl + str + `limit=${limit}&$page=${page}`
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      getRestaurantById: (id:any) =>{
        var str = "supplier_info/get_supplier_by_id/"
        const api = this.apiUrl + str + id
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      }
    }
  }
}
