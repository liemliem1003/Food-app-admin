import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  selectedNavigation: any = 0
  navigationOption:any =[
    {
      icon: "/assets/Image/Navigation/Dashboard.png",
      name: "Dashboard",
      slug:"/dashboard"
    },
    {
      icon: "/assets/Image/Navigation/Leaderboard.png",
      name: "Leaderboard",
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
      slug:"/sale-report"
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

  ChangeSelectedNavigation(number:number){
    console.log(number);
    this.selectedNavigation = number
  }


}
