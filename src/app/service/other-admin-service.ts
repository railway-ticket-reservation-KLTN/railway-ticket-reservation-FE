import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminService } from "./admin-service.service";
import { Observable, of  } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class OtherAdminService{
    constructor(
        private http: HttpClient,
        private adminService:AdminService){
    }

    public getDanhSachVe(): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.http.get<any>('http://localhost:8080/v1/nhanvien/dsve', { headers });
        }
        // Xử lý logic khi không có token
        return of(null); 
      }

      public getDanhSachTaiKhoan(): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.http.get<any>('http://localhost:8080/v1/admin/taikhoans', { headers });
        }
        // Xử lý logic khi không có token
        return of(null); 
      }

      public getDanhSachHanhTrinh(): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.http.get<any>('http://localhost:8080/v1/admin/hanhtrinhs', { headers });
        }
        // Xử lý logic khi không có token
        return of(null); 
      }
  }