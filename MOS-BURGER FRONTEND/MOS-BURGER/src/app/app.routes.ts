import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ProductManagementComponent } from './page/dashboard/product/product.component';
import { PlaceOrderManagementComponent } from './page/dashboard/placeorder/placeorder.component';
import { OrderComponent } from './page/dashboard/order/order.component';
import { CustomerComponent } from './page/dashboard/customer/customer.component';


export const routes: Routes = [
    {
        path:"",
        component: LoginComponent
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path:"dashboard",
        component: DashboardComponent,
    },
    {
        path: "product",
        component: ProductManagementComponent
    },
    {
        path: "placeorder",
        component: PlaceOrderManagementComponent
    },
    {
        path: "order",
        component:OrderComponent
    },
    {
        path: "customer",
        component:CustomerComponent
    }
 
];
