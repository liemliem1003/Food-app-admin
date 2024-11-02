import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiserviceComponent } from '../apiservice/apiservice.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private apiService: ApiserviceComponent,private cookieService: CookieService) { }

  Login(email: string, password: string) {
    var credentials = {
      email: email,
      password: password,
    }
    this.apiService.LoginAPI(credentials).then((data:any)=>{
      console.log(data);
      var token = data.token
      this.cookieService.set('loginToken', token, 7, '/');
      localStorage.setItem("refreshKey", data.refresh_token);
      localStorage.setItem("email", data.email);
      location.reload();
    }).catch((error: any) => {
      console.log(error);
      alert("Username or Password is incorrect!!!")
    })
  }
  
}
