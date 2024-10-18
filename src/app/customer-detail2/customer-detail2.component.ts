import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-detail2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-detail2.component.html',
  styleUrl: './customer-detail2.component.scss'
})
export class CustomerDetail2Component {
  list = [
    {
      img:"/assets/Image/CustomerDetails/Logo.png",
      name:"Gatsby Night",
      date:"September 19, 2024",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit eo ut vitae neque sed sed sit sagittis tristique scelerisque.",
      stars:2,
  
    },
    {
      img:"/assets/Image/CustomerDetails/Logo.png",
      name:"Gatsby Night",
      date:"September 19, 2024",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit eo ut vitae neque sed sed sit sagittis tristique scelerisque.",
      stars:1,
  
    },
    {
      img:"/assets/Image/CustomerDetails/Logo.png",
      name:"Gatsby Night",
      date:"September 19, 2024",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit eo ut vitae neque sed sed sit sagittis tristique scelerisque.",
      stars:4,
  
    },
    {
      img:"/assets/Image/CustomerDetails/Logo.png",
      name:"Gatsby Night",
      date:"September 19, 2024",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit eo ut vitae neque sed sed sit sagittis tristique scelerisque.",
      stars:5,
  
    },
   
  ]
}
