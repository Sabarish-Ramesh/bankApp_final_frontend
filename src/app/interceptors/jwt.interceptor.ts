import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
  return next(req) // skip token for auth endpoints
}

  //cant directly modify the http request ,so make a clone and addd the token in the header
  
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};
