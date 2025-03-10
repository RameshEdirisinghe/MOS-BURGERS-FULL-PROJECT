import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  last5Orders: any[] = []; 
  lastMonthOrderCount: any = 0;
  AllOrders  = 0;
  AllCustomers = 0;
  AllProducts = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLast5Orders();
    this.fetchLastMonthOrderCount();
    this.fetchOrderCount();
    this.fetchProductCount();
    this.fetchCustomerCount();
  }

  // Fetch the last 5 orders
  fetchLast5Orders() {
    this.http.get('http://localhost:8080/order/getFive').subscribe(
      (response: any) => {
        this.last5Orders = response;
      },
      (error) => {
        console.error('Failed to fetch last 5 orders:', error);
      }
    );
  }

  fetchLastMonthOrderCount() {
    this.http.get('http://localhost:8080/order/count').subscribe(
      (response: any) => {
        this.lastMonthOrderCount = response;
      },
      (error) => {
        console.error('Failed to fetch last month order count:', error);
      }
    );
  }

  fetchOrderCount() {
    this.http.get('http://localhost:8080/order/count').subscribe(
      (response: any) => {
        this.AllOrders = response;
        console.log(this.AllOrders);
        
      },
      (error) => {
        console.error('Failed to fetch last month order count:', error);
      }
    );
  }

  fetchProductCount() {
    this.http.get('http://localhost:8080/item/count').subscribe(
      (response: any) => {
        this.AllProducts = response;
        console.log(this.AllProducts);
        
      },
      (error) => {
        console.error('Failed to fetch last month order count:', error);
      }
    );
  }

  fetchCustomerCount() {
    this.http.get('http://localhost:8080/customer/count').subscribe(
      (response: any) => {
        this.AllCustomers = response;
        console.log(this.AllCustomers);
        
      },
      (error) => {
        console.error('Failed to fetch last month order count:', error);
      }
    );
  }
}
