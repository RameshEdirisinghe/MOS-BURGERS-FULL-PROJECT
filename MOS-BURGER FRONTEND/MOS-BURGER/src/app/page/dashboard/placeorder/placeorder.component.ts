import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-placeorder-management',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css'],
})
export class PlaceOrderManagementComponent {
  allMeals: any[] = [];
  addCart: any[] = [];
  totalAmount = 0;
  changeAmount = 0;
  searchQuery = '';

  constructor(private http: HttpClient) {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get('http://localhost:8080/item/all').subscribe(
      (response: any) => {
        this.allMeals = response;
      },
      (error) => {
        console.error('Failed to fetch products:', error);
      }
    );
  }

  addToCart(mealId: string) {
    const meal = this.allMeals.find((m) => m.id === mealId);
    if (meal) {
      const existingItem = this.addCart.find((item) => item.id === mealId);
      if (existingItem) {
        existingItem.qty++;
      } else {
        this.addCart.push({ ...meal, qty: 1 });
      }
      this.updateCart();
    }
  }

  updateCart() {
    this.totalAmount = this.addCart.reduce((total, item) => total + item.price * item.qty, 0);
  }

  removeFromCart(mealId: string) {
    this.addCart = this.addCart.filter((item) => item.id !== mealId);
    this.updateCart();
  }

  calculateChange() {
    const receivedInput = document.getElementById('received-amount-input') as HTMLInputElement;
    const received = parseFloat(receivedInput.value) || 0;
    this.changeAmount = received - this.totalAmount;
  }

  printBill() {
    const receivedInput = document.getElementById('received-amount-input') as HTMLInputElement;
    const received = parseFloat(receivedInput.value) || 0;
    const change = this.changeAmount >= 0 ? this.changeAmount : 0;

    const billContent = `
      <div style="text-align: left; font-family: Arial, sans-serif;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="text-align: left; padding: 5px;">Item</th>
              <th style="text-align: left; padding: 5px;">Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${this.addCart.map((item) => `
              <tr>
                <td style="padding: 5px;">${item.itemName}</td>
                <td style="padding: 5px;">${item.qty}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <br>
        <p style="margin-top: 10px;"><strong>Total Amount:</strong> Rs. ${this.totalAmount.toFixed(2)}</p>
        <p style="margin-top: 10px;"><strong>Received Amount:</strong> Rs. ${received.toFixed(2)}</p>
        <p><strong>Change Amount:</strong> Rs. ${change.toFixed(2)}</p>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Mos Burgers Bill</title>
            <style>
              body { font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            </style>
          </head>
          <body>
            <h1>Mos Burgers</h1>
            ${billContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }
}