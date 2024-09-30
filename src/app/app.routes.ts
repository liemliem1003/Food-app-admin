import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesreportComponent } from './salesreport/salesreport.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sale-report', component: SalesreportComponent },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];
