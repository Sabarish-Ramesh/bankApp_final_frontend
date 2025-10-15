import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CreateCustomerRequest } from '../../models/customer.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  Object = Object; // to use Object.keys in template
  form: CreateCustomerRequest = { name: '', address: '', phone: '', email: '', password: '' };
  ok = '';
  err = '';
  fieldErrors: any = {};
  submitted = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.ok = '';
    this.err = '';
    this.fieldErrors = {};
    this.submitted = true;

    // ✅ Frontend quick validation for empty fields
    if (!this.form.name || !this.form.address || !this.form.phone || !this.form.email || !this.form.password) {
      this.err = 'Please fill all required fields.';
      return;
    }

    this.auth.register(this.form).subscribe({
      next: _ => {
        this.ok = 'Registered successfully. Please login.';
        this.submitted = false;
        setTimeout(() => this.router.navigate(['/login']), 800);
      },
      error: (e) => {
        console.log('Full backend error:', e);

        let errorObj: any = e?.error;

        // 🟢 Sometimes the backend sends JSON as a string — handle it safely
        if (typeof errorObj === 'string') {
          try {
            errorObj = JSON.parse(errorObj);
          } catch {
            errorObj = { message: errorObj };
          }
        }

        // 🟢 Support multiple possible response structures
        const fields =
          errorObj?.fields ||
          errorObj?.error?.fields ||
          errorObj?.errors ||
          null;

        if (fields) {
          this.fieldErrors = fields;
          this.err = ''; // clear general error
        } else if (errorObj?.message) {
          this.err = errorObj.message;
        } else {
          this.err = 'Register failed';
        }
      }
    });
  }
}
