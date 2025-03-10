import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  searchQuery: string = '';
  customers: any[] = []; 
  filteredCustomers: any[] = []; 
  editRow: any = null; 

  
  newCustomer = {
    customerName: '',
    phoneNumber: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCustomers(); 
  }

  
  fetchCustomers() {
    this.http.get('http://localhost:8080/customer/all').subscribe(
      (response: any) => {
        this.customers = response;
        this.filteredCustomers = this.customers;
      },
      (error) => {
        console.error('Failed to fetch customers:', error);
      }
    );
  }


  filterCustomers() {
    if (this.searchQuery.trim() === '') {
      this.filteredCustomers = this.customers;
    } else {
      this.filteredCustomers = this.customers.filter((customer) =>
        customer.customerName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


  addCustomer() {
    if (this.newCustomer.customerName && this.newCustomer.phoneNumber) {
      this.http.post('http://localhost:8080/customer/add', this.newCustomer).subscribe(
        (response: any) => {
          this.fetchCustomers(); 
          this.newCustomer = { customerName: '', phoneNumber: '' }; 
        },
        (error) => {
          console.error('Failed to add customer:', error);
        }
      );
    }
  }

  startEdit(customer: any) {
    this.editRow = { ...customer }; 
  }

  saveEdit(customer: any) {
    this.http.put('http://localhost:8080/customer/update', this.editRow).subscribe(
      (response: any) => {
        this.fetchCustomers(); 
        this.editRow = null; 
      },
      (error) => {
        console.error('Failed to update customer:', error);
      }
    );
  }

 
  cancelEdit() {
    this.editRow = null; 
  }

  deleteCustomer(customer: any) {
    this.http.delete(`http://localhost:8080/customer/delete/${customer.id}`).subscribe(
      (response: any) => {
        this.fetchCustomers(); 
      },
      (error) => {
        console.error('Failed to delete customer:', error);
      }
    );
  }
}