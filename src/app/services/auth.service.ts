import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthRequest, AuthResponse, TokenPayload } from '../models/auth.model';
import { CreateCustomerRequest, CustomerDto } from '../models/customer.model';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'bank_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: AuthRequest) { 
    return this.http.post<AuthResponse>(`${this.base}/auth/login`, data);
   }
  register(data: CreateCustomerRequest) { 
    return this.http.post<CustomerDto>(`${this.base}/auth/register`, data, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
  }); 
  }

  saveToken(token: string) { 
    localStorage.setItem(TOKEN_KEY, token);
   }
  getToken() { 
    return localStorage.getItem(TOKEN_KEY); 
  }
  logout() { 
    localStorage.removeItem(TOKEN_KEY); this.router.navigate(['/login']); 
  }

  isLoggedIn(): boolean {
    const t = this.getToken(); 
    if (!t) return false;
    try { 
      const p = jwtDecode<TokenPayload>(t); 
      return p.exp > Math.floor(Date.now()/1000);
     }
    catch { return false; }
  }
  isAdmin(): boolean {
    const t = this.getToken(); 
    if (!t) return false;
    try {
       return jwtDecode<TokenPayload>(t).role === 'ROLE_ADMIN';
       } 
    catch {
       return false; 
      }
  }
  email(): string | null {
    const t = this.getToken();
     if (!t) return null;
    try { 
      return jwtDecode<TokenPayload>(t).sub;
     } catch { 
      return null;
     }
  }
}
