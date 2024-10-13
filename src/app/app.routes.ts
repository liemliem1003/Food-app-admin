import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';



// export const routes: Routes = [
//     { path: 'dashboard', component: DashboardComponent },
//     { path: 'sale-report', component: SalesreportComponent },
//     { path: 'login', component: LoginComponent },
//     { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
// ];



var mainComponent = new AppComponent()
var login = mainComponent.login
var routeLogin: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sale-report', component: SalesreportComponent },
    { path: 'restaurant', component: RestaurantsComponent },
    { path: 'restaurant-details', component: RestaurantDetailComponent },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
]

var routeNoneLogin: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
]

export const routes: Routes = login? routeLogin : routeNoneLogin
