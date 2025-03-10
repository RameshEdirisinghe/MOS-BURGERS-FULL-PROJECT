import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = ''; 
  password: string = ''; 

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit() {
    
    if (!this.username || !this.password) {
      alert('Please enter both username and password.');
      return;
    }

  
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid username or password');
        }
      },
      (error) => {
        console.error('Login failed:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }
}