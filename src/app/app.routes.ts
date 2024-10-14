import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { DevelopingComponent } from './developing/developing.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

var mainComponent = new AppComponent()
var login = mainComponent.login
var routeLogin: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sale-report', component: SalesreportComponent },
    { path: 'restaurant', component: RestaurantsComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'customer-detail', component: CustomerDetailComponent },
    { path: 'restaurant-details', component: RestaurantDetailComponent },
    { path: 'developing', component: DevelopingComponent },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
]

var routeNoneLogin: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
]

export const routes: Routes = login? routeLogin : routeNoneLogin
