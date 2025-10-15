import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  form: AuthRequest = { username: '', password: '' };
  error = '';
  submitted = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.submitted = true;

    // ✅ Basic frontend validation
    if (!this.form.username || !this.form.password) {
      this.error = 'Please fill all required fields.';
      return;
    }

    this.auth.login(this.form).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.submitted = false;

        if (this.auth.isAdmin()) {
          this.router.navigate(['/admin/customers']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (e) => {
        this.error = e?.error?.message || 'Invalid credentials';
      },
    });
  }
}
