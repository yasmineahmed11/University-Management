import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerData = {
    username: '',
    password: '',
    role: ''
  };

  message = '';
  isSubmitting = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.isSubmitting = true;
    const payload = {
      username: this.registerData.username.trim(),
      password: this.registerData.password,
      role: this.registerData.role
    };

    this.http.post<{ message: string }>('http://localhost:9090/auth/register', payload)
      .subscribe({
        next: (res) => {
          this.message = ' Registered successfully!';
          // Optionally redirect:
          // this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.message = ' Registration failed: ' + (err.error?.message || 'Unknown error');
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
