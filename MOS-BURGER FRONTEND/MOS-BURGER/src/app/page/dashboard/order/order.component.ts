import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  searchQuery: string = '';
  orders: any[] = []; 
  filteredOrders: any[] = []; 
  editRow: any = null; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders(); 
  }


  fetchOrders() {
    this.http.get('http://localhost:8080/order/all').subscribe(
      (response: any) => {
        this.orders = response;
        this.filteredOrders = this.orders; 
      },
      (error) => {
        console.error('Failed to fetch orders:', error);
      }
    );
  }

 
  filterOrders() {
    if (this.searchQuery.trim() === '') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter((order) =>
        order.customerName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}