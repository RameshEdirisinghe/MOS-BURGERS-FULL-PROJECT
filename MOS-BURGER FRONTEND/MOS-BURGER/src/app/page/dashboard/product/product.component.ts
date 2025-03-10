import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AwsS3Service } from '../../../services/s3';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,RouterLink],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductManagementComponent {
  products: any[] = [];
  selectedFile: File | null = null;
  isUploading = false;
  error = '';
  searchQuery = '';

  product = {
    itemName: '',
    des: '',
    price: 0,
    qty: 0,
    imgUrl: '',
  };

 

  editingProduct: any = null; 

  constructor(private awsS3Service: AwsS3Service, private http: HttpClient) {
    this.fetchProducts();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
      this.error = '';
    }
  }

  async uploadImage() {
    if (!this.selectedFile) return;
    
    try {
      this.isUploading = true;
      this.error = '';
      const url = await this.awsS3Service.uploadFile(this.selectedFile);
      this.product.imgUrl = url;
      alert('Image uploaded successfully!');
    } catch (err) {
      this.error = 'Image upload failed';
    } finally {
      this.isUploading = false;
    }
  }

  addProduct() {
    if (!this.product.imgUrl) {
      this.error = 'Please upload an image first';
      return;
    }

    this.http.post('http://localhost:8080/item/add', this.product).subscribe(
      (response) => {
        alert('Product added successfully!');
        this.resetForm();
        this.fetchProducts();
      },
      (error) => {
        this.error = 'Failed to add product';
      }
    );
  }
  
  fetchProducts() {
    this.http.get('http://localhost:8080/item/all').subscribe(
      (response: any) => {
        this.products = response;
      },
      (error) => {
        this.error = 'Failed to fetch products';
      }
    );
  }

  searchProducts() {
    
    this.http.get(`http://localhost:8080/item/search-name/${this.searchQuery}`).subscribe(
      (response: any) => {
        this.products = Array.isArray(response) ? response : [response];
      },
      (error) => {
        this.error = 'Failed to search products';
      }
    );
  }

  deleteProduct(productId: number) {
    this.http.delete(`http://localhost:8080/item/delete/${productId}`).subscribe(
      (response) => {
        alert('Product deleted successfully!');
        this.fetchProducts();
      },
      (error) => {
        this.error = 'Failed to delete product';
      }
    );
  }


  editProduct(product: any) {
    this.editingProduct = { ...product }; // Create a copy of the product for editing
  }


  cancelEdit() {
    this.editingProduct = null;
  }

  saveProduct() {
    this.http.put(`http://localhost:8080/item/update/${this.editingProduct.id}`, this.editingProduct).subscribe(
      (response) => {
        alert('Product updated successfully!');
        this.fetchProducts();
        this.editingProduct = null;
      },
      (error) => {
        this.error = 'Failed to update product';
      }
    );
  }

  resetForm() {
    this.product = {
      itemName: '',
      des: '',
      price: 0,
      qty: 0,
      imgUrl: '',
    };
    this.selectedFile = null;
  }
}