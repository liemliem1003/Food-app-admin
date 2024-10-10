import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiserviceComponent } from '../apiservice/apiservice.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private apiService: ApiserviceComponent) { }

  Login(email: string, password: string) {
    var credentials = {
      email: email,
      password: password,
    }
    this.apiService.LoginAPI(credentials).then((data:any)=>{
      console.log(data);
      
    })
  }
}
