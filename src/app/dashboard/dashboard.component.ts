import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  todaySales: any = [
    {
      icon: "/assets/Image/Dashboard/TotalSalesIcon.png",
      value: "1k VND",
      title: "Total Sales",
      description: "+8%",
      class: "total-sales"
    },
    {
      icon: "/assets/Image/Dashboard/TotalOrdersIcon.png",
      value: "300",
      title: "Total Orders",
      description: "+5%",
      class: "total-orders"
    },
    {
      icon: "/assets/Image/Dashboard/ProductsSoldIcon.png",
      value: "5",
      title: "Products Sold",
      description: "+1.2%",
      class: "products-sold"
    },
    {
      icon: "/assets/Image/Dashboard/NewCostumersIcon.png",
      value: "8",
      title: "New Costumers",
      description: "+0.5%",
      class: "new-costumers"
    }
  ]

  totalRevenue: any = {
    numberOfRows: 6,
    rows: [],
    maxValue: 0,
    columns: [
      {
        colName: 'Monday',
        onlineSales: 14000,
        offlineSales: 13000,
      },
      {
        colName: 'Tuesday',
        onlineSales: 14000,
        offlineSales: 15000,
      },
      {
        colName: 'Wednesday',
        onlineSales: 14000,
        offlineSales: 17000,
      },
      {
        colName: 'Thursday',
        onlineSales: 19000,
        offlineSales: 14000,
      },
      {
        colName: 'Friday',
        onlineSales: 11000,
        offlineSales: 2000,
      },
      {
        colName: 'Saturday',
        onlineSales: 20000,
        offlineSales: 4000,
      },
      {
        colName: 'Sunday',
        onlineSales: 3000,
        offlineSales: 25000,
      }
    ]
  }

  tagetVsReality: any = {
    options: [
      {
        name: "Jan",
        reality: 1000,
        target: 2000,
      },
      {
        name: "Feb",
        reality: 2000,
        target: 4000,
      },
      {
        name: "Mar",
        reality: 3000,
        target: 4000,
      },
      {
        name: "Apr",
        reality: 2500,
        target: 5000,
      },
      {
        name: "May",
        reality: 2000,
        target: 2000,
      },
      {
        name: "Jun",
        reality: 2500,
        target: 4000,
      },
      {
        name: "Jul",
        reality: 3000,
        target: 1000,
      },
      // {
      //   name: "Aug",
      //   reality: 2000,
      //   target: 5000,
      // },
      // {
      //   name: "Sep",
      //   reality: 2000,
      //   target: 4000,
      // },
      // {
      //   name: "Oct",
      //   reality: 1000,
      //   target: 2000,
      // },
      // {
      //   name: "Nov",
      //   reality: 4000,
      //   target: 3500,
      // },
      // {
      //   name: "Dec",
      //   reality: 1000,
      //   target: 2000,
      // },
    ],
    maxValue: 0
  }

  topProducts: any = [
    {
      name: "Home Decor Range 1",
      popularity:0.4,
      sales:0.5,
      mainColor: "0095FF",
      bgColor: "CDE7FF",
      color:"0095FF",
      saleBgColor:"F0F9FF"
    },
    {
      name: "Home Decor Range 2",
      popularity:0.6,
      sales:0.7,
      mainColor: "00E096",
      bgColor: "8CFAC7",
      color:"00E58F",
      saleBgColor:"F0FDF4"
    },
    {
      name: "Home Decor Range 3",
      popularity:0.8,
      sales:0.2,
      mainColor: "884DFF",
      bgColor: "C5A8FF",
      color:"884DFF",
      saleBgColor:"FBF1FF"
    },
    {
      name: "Home Decor Range 4",
      popularity:0.6,
      sales:0.8,
      bgColor: "FFD5A4",
      mainColor: "FF8F0D",
      color:"FF8900",
      saleBgColor:"FEF6E6"
    },
  ]
  volumeVsServiceLevel: any = {
    options:[
      {
        volume: 200,
        service: 150,
      },
      {
        volume: 100,
        service: 200,
      },
      {
        volume: 250,
        service: 200,
      },
      {
        volume: 250,
        service: 100,
      },
      {
        volume: 200,
        service: 140,
      },
      {
        volume: 200,
        service: 210,
      },
    ]
  }
  ngOnInit() {
    this.UpdateRowsOfTotalRevenue()
    this.UpdateColumnssOfTargetVsReality()
    this.UpdateVolumeVsServiceLevel()
    console.log(this.volumeVsServiceLevel);

  }

  UpdateRowsOfTotalRevenue() {
    //update maxValue
    var maxValue = 0
    for (let i = 0; i < this.totalRevenue.columns.length; i++) {
      if (this.totalRevenue.columns[i].onlineSales > maxValue) {
        maxValue = this.totalRevenue.columns[i].onlineSales
      }
      if (this.totalRevenue.columns[i].offlineSales > maxValue) {
        maxValue = this.totalRevenue.columns[i].offlineSales
      }
    }
    this.totalRevenue.maxValue = maxValue

    //update rows
    var averageValueOfEachRow = maxValue / (this.totalRevenue.numberOfRows - 1)
    this.totalRevenue.rows = []
    for (let i = 0; i < this.totalRevenue.numberOfRows; i++) {
      this.totalRevenue.rows[i] = this.FormatNumber(i * averageValueOfEachRow)
    }
    this.totalRevenue.rows.reverse()
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
  UpdateColumnssOfTargetVsReality() {
    var maxValue = 0
    for (let i = 0; i < this.tagetVsReality.options.length; i++) {
      if (this.tagetVsReality.options[i].reality > maxValue) {
        maxValue = this.tagetVsReality.options[i].reality
      }
      if (this.tagetVsReality.options[i].target > maxValue) {
        maxValue = this.tagetVsReality.options[i].target
      }
    }
    this.tagetVsReality.maxValue = maxValue
  }
  UpdateVolumeVsServiceLevel() {
    var maxValue = 0
    for (let i = 0; i < this.volumeVsServiceLevel.options.length; i++) {
      var value = this.volumeVsServiceLevel.options[i].volume + this.volumeVsServiceLevel.options[i].service
      if(maxValue < value){
        maxValue = value
      }   
    }
    this.volumeVsServiceLevel.maxValue = maxValue
  }
}
