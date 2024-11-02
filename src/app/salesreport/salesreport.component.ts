import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-salesreport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salesreport.component.html',
  styleUrl: './salesreport.component.scss'
})
export class SalesreportComponent {

  customerDetails: any = [
    {
      id: "RZ17308",
      name: "Name 1",
      date: "13/01/2024",
      amount: 5000,
      status: 0
    },
    {
      id: "RZ17307",
      name: "Name 2",
      date: "22/01/2024",
      amount: 5000,
      status: 1
    },
    {
      id: "RE173012",
      name: "Name 3",
      date: "05/01/2024",
      amount: 10000,
      status: 2
    },
  ]
  customerDetailsStatus: any = {
    0: {
      status: "Shipped",
      color: "#C49D50"
    },
    1: {
      status: "Delivered",
      color: "#73FFCC"
    },
    2: {
      status: "Paid",
      color: "#6F82E8"
    }
  }

  sale: any = {
    numberOfRows: 5,
    options: [
      {
        value1: 1000,
        direction1: 0,
        value2: 4000,
        direction2: 0,
      },
      {
        value1: 2000,
        direction1: 0,
        value2: 10000,
        direction2: 0,
      },
      {
        value1: 4000,
        direction1: 0,
        value2: 4000,
        direction2: 0,
      },
      {
        value1: 5000,
        direction1: 0,
        value2: 8000,
        direction2: 0,
      },
      {
        value1: 2000,
        direction1: 0,
        value2: 4000,
        direction2: 0,
      },
      {
        value1: 1000,
        direction1: 0,
        value2: 7000,
        direction2: 0,
      },
      {
        value1: 2800,
        direction1: 0,
        value2: 8000,
        direction2: 0,
      },
      {
        value1: 7000,
        direction1: 0,
        value2: 1000,
        direction2: 0,
      },
      {
        value1: 2500,
        direction1: 0,
        value2: 5700,
        direction2: 0,
      },
      {
        value1: 2200,
        direction1: 0,
        value2: 6600,
        direction2: 0,
      },
      {
        value1: 6000,
        direction1: 0,
        value2: 7500,
        direction2: 0,
      },
      {
        value1: 4000,
        direction1: 0,
        value2: 5000,
        direction2: 0,
      },

    ]
  }
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  years = []
  calendar: any = {
    days:[],
    currentDay: new Date()
  }

  showDateSelector:boolean=true

  circleChart:any = {
    shopName: "petshop.com",
    description: "(Oreo)",
    logo:"assets/Image/SaleReport/Logo.png",
    options:[
      {
        name:"Facebook",
        value: 20,
        color: "#FFC9C0"
      },
      {
        name:"Youtube",
        value: 10,
        color: "#45F6D4"
      }
      ,
      {
        name:"Instagram",
        value: 10,
        color: "#FE7070"
      },
      {
        name:"Website",
        value: 20,
        color: "#D1F5A6"
      }
    ],
    moreDetailsOptions:[
      {
        title: "Total intake",
        value:1500000,
        specialValue:0,
      },
      {
        title: "New Customers",
        value: 7000,
        specialValue: 1000
      },
      {
        title: "Repeat Customers",
        value: 1500,
        specialValue:2220,
      },
      {
        title: "Total Revenue",
        value: 130000,
        specialValue:0,
      }
    ],
    visitorOptions:[
      {
        title:"Online Visitor",
        amount:20000,
        percentage:90
      },
      {
        title:"Offline Visitor",
        amount:7000,
        percentage:50
      }
    ]
  }

  ngOnInit() {
    this.UpdateSale()
    this.UpdateCalendar(this.calendar.currentDay.getMonth()+1,this.calendar.currentDay.getFullYear())
    this.UpdateCircleChart()
  }

  AddSpaceToNumber(number: any) {
    number = number.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(number))
      number = number.replace(pattern, "$1 $2");
    return number;
  }

  UpdateSale() {
    var maxValue = 0
    for (let i = 0; i < this.sale.options.length; i++) {
      if (maxValue < this.sale.options[i].value1) {
        maxValue = this.sale.options[i].value1
      }
      if (maxValue < this.sale.options[i].value2) {
        maxValue = this.sale.options[i].value2
      }
      if (this.sale.options[i].value1 > this.sale.options[i + 1]?.value1) {
        this.sale.options[i].direction1 = 0
      } else {
        this.sale.options[i].direction1 = 1
      }
      if (this.sale.options[i].value2 > this.sale.options[i + 1]?.value2) {
        this.sale.options[i].direction2 = 0

      } else {
        this.sale.options[i].direction2 = 1
      }
    }
    this.sale.maxValue = maxValue
  }

  FormatNumber(num: number) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm'; // For numbers in millions
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'; // For numbers in thousands
    } else {
      return num.toString(); // For numbers less than 1000
    }
  }
  NumberToFixed(number: number) {
    return Number(number).toFixed(2)
  }
  WidthCalculation(a: number, b: number) {
    return this.NumberToFixed(Math.sqrt(a * a + b * b))
  }
  DegreeCalculation(a: number, b: number) {
    return this.NumberToFixed(Math.atan(b / a) * 180 / Math.PI)
  }
  UpdateCalendar(month: number, year: number) {
    var days = []
    var date = new Date(year, month - 1, 1)
    let lastDay = new Date(year, month, 0).getDate()
    if (date.getDay()!=0) {
      for (let i = 0; i < date.getDay(); i++) {
        var day = new Date(year, month-2, 0).getDate() -date.getDay() + i
        days.push({
          value: new Date(year,month-2,day).toString().split(" "),
          status:0
        })
      }
    }
    for (let day = 1; day <= lastDay; day++) {
      days.push({
        value: new Date(year, month - 1, day).toDateString().split(" "),
        status:1
      }); 
    }
    if(new Date(year, month, 0).getDay()!= 6){
      for (let i = 0; i < 6-new Date(year, month, 0).getDay(); i++) {
        days.push({
          value: new Date(year, month + 1, i).toString().split(" "),
          status:0
        })
      }
    }
    this.calendar.days = days
  }
  SelectCalendar(up:boolean){
    var currentYear = this.calendar.currentDay.getFullYear()
    var currentMonth = this.calendar.currentDay.getMonth()
    up ? this.calendar.currentDay = new Date(currentYear, currentMonth + 2,0): this.calendar.currentDay = new Date(currentYear, currentMonth,0)
    this.UpdateCalendar(this.calendar.currentDay.getMonth()+1,this.calendar.currentDay.getFullYear())

  }

  UpdateCircleChart(){
    var total = 0
    var rotate = 45
    for (let i = 0; i < this.circleChart.options.length; i++) {
      total += this.circleChart.options[i].value
    }
    for (let i = 0; i < this.circleChart.options.length; i++) {
      var percentage = this.circleChart.options[i].value/total
      this.circleChart.options[i].rotate = rotate
      this.circleChart.options[i].percentage = percentage
      rotate += percentage*360
      var polygon = "polygon(50% 50%, 0 0, "
      while (true) {
        if (percentage <= 0.25) {
            polygon +=`${(percentage/0.25)*100}%  0`
            break;
          }else{
            polygon += "100% 0, "
          }
          if(percentage > 0.25 && percentage <= 0.5){
            polygon +=`100% ${(percentage/0.5)*100}%`
            break;
          }else{
            polygon += "100% 100%, "
          }
          if(percentage > 0.5 && percentage <= 0.75){
            polygon += `${(1 - percentage/0.75)*100}% 100%`
            break;
          }else{
            polygon+= "0 100%, "
          }
    
          if (percentage > 0.75) {
            polygon += `0 ${(1 - percentage/1)*100}%`
            break;
          }
      }

      var r = 226.7/2
      let test = (r * Math.sqrt(2) * Math.tan(percentage * 2 * Math.PI) / (Math.tan(percentage * 2 * Math.PI) + 1)) / (2 * r)
      polygon += ")"
      this.circleChart.options[i].polygon = polygon
    }
    this.circleChart.total = total
  }
}
