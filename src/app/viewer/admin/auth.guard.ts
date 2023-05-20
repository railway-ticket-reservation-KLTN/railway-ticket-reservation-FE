import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    // Nếu đã đăng nhập, trả về true để cho phép truy cập vào trang admin
    // Ngược lại, chuyển hướng người dùng đến trang login
    const isLoggedIn = '...' ;// Thực hiện kiểm tra đăng nhập của người dùng

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
