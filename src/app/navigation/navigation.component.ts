import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from '../app.routes';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  selectedNavigation: any = 0
  navigationOption: any = [
    {
      icon: "/assets/Image/Navigation/Dashboard.png",
      name: "Dashboard",
      slug: "/dashboard"
    },
    {
      icon: "/assets/Image/Navigation/Leaderboard.png",
      name: "Leaderboard",
    },
    {
      icon: "/assets/Image/Navigation/Leaderboard.png",
      name: "Nhà hàng",
      slug: "/restaurant"
    },
    {
      icon: "/assets/Image/Navigation/Costumer.png",
      name: "Costumer",
    },
    {
      icon: "/assets/Image/Navigation/Products.png",
      name: "Products",
    },
    {
      icon: "/assets/Image/Navigation/SalesReport.png",
      name: "Sales Report",
      slug: "/sale-report"
    },
    {
      icon: "/assets/Image/Navigation/Messages.png",
      name: "Messages",
    },
    {
      icon: "/assets/Image/Navigation/Settings.png",
      name: "Settings",
    },
    {
      icon: "/assets/Image/Navigation/SignOut.png",
      name: "Sign Out",
    }
  ]
  constructor(private cookieService: CookieService) { }
  ChangeSelectedNavigation(number: number, isLogout: boolean) {
    this.selectedNavigation = number
    isLogout ? this.RemoveCookie() : true
  }

  ngOnInit() {
    console.log(this.cookieService.get('loginToken'));
  }
  RemoveCookie() {
    if (window.confirm("Would you like to logout?")) {
      this.cookieService.delete('loginToken', '/');
      location.reload()
    }
  }
}
