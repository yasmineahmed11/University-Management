import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private AuthService: AuthService
  ) {}

  login() {
    this.http.post<any>('http://localhost:9090/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        // ✅ Save token via AuthService
        this.AuthService.login(res.token);

        // Optional: store user role if needed
        localStorage.setItem('userRole', res.role);

        // ✅ Redirect to homepage after login
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Login failed');
        console.error('Login error:', err);
      }
    });
  }
}
