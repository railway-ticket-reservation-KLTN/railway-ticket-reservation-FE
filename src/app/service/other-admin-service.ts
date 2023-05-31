import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminService } from "./admin-service.service";
import { Observable, of  } from "rxjs";
import { ThemHanhTrinhRequest } from "../domain/admin/ThemHanhTrinhRequest";
import { ThemNhanVien } from "../domain/admin/ThemNhanVien";

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
      public xacNhanDatVe(data: any[]): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
      
          // Sử dụng mảng data trong yêu cầu HTTP
          return this.http.post<any>('http://localhost:8080/v1/nhanvien/datvetrasau', data, { headers });
        }
      
        // Xử lý logic khi không có token
        return of(null);
      }
      public xacNhanTraVe(data: any[]): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
      
          // Sử dụng mảng data trong yêu cầu HTTP
          return this.http.post<any>('http://localhost:8080/v1/nhanvien/trave', data, { headers });
        }
      
        // Xử lý logic khi không có token
        return of(null);
      }

      public getDSMaDatCho(maDatCho:string): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
      
          // Sử dụng mảng data trong yêu cầu HTTP
          return this.http.get<any>('http://localhost:8080/v1/nhanvien/vestheomadatcho?maDatCho=' + maDatCho, { headers });
        }
      
        // Xử lý logic khi không có token
        return of(null);
      }
      public themHanhTrinh(hanhTrinhRequest:ThemHanhTrinhRequest[]): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
      
          // Sử dụng mảng data trong yêu cầu HTTP
          return this.http.post<any>('http://localhost:8080/v1/admin/themhanhtrinh', hanhTrinhRequest, { headers });
        }
      
        // Xử lý logic khi không có token
        return of(null);
      }

      public xoaHanhTrinh(data: any[]): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
      
          // Sử dụng mảng data trong yêu cầu HTTP
          return this.http.post<any>('http://localhost:8080/v1/admin/xoahanhtrinh', data, { headers });
        }
      
        // Xử lý logic khi không có token
        return of(null);
      }

      public themTaiKhoan(themNhanVien:ThemNhanVien): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
      
          // Sử dụng mảng data trong yêu cầu HTTP
          return this.http.post<any>('http://localhost:8080/v1/admin/themtk', themNhanVien, { headers });
        }
      
        // Xử lý logic khi không có token
        return of(null);
      }
      public xoaTaiKhoan(data: any[]): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
      
          // Sử dụng mảng data trong yêu cầu HTTP
          return this.http.post<any>('http://localhost:8080/v1/admin/xoatk', data, { headers });
        }
      
        // Xử lý logic khi không có token
        return of(null);
      }

      public capNhatHanhTrinh(data: any): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
      
          // Sử dụng mảng data trong yêu cầu HTTP
          return this.http.post<any>('http://localhost:8080/v1/admin/capnhathanhtrinh', data, { headers });
        }
      
        // Xử lý logic khi không có token
        return of(null);
      }

      public capNhatTaiKhoan(data: any): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
      
          // Sử dụng mảng data trong yêu cầu HTTP
          return this.http.post<any>('http://localhost:8080/v1/admin/capnhattk', data, { headers });
        }
      
        // Xử lý logic khi không có token
        return of(null);
      }
      public getDanhSachVeTrongThang(): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.http.get<any>('http://localhost:8080/v1/admin/sovethang', { headers });
        }
        // Xử lý logic khi không có token
        return of(null); 
      }
      public getDoanhThuTrongThang(): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.http.get<any>('http://localhost:8080/v1/admin/doanthuthang', { headers });
        }
        // Xử lý logic khi không có token
        return of(null); 
      }
      public getDoanhThuTrongNam(): Observable<any[]> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.http.get<any[]>('http://localhost:8080/v1/admin/doanthuthangtrongnam', { headers });
        }
        // Xử lý logic khi không có token
        return of([]); 
      }


      public getThongKeTrongNam(nam:string): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
      
          // Sử dụng mảng data trong yêu cầu HTTP
          return this.http.get<any>('http://localhost:8080/v1/admin/thongketheonam?nam=' + nam, { headers });
        }
      
        // Xử lý logic khi không có token
        return of(null);
      }
      public getThongKeThangTrongNam(nam:string, thang:number): Observable<any> {
        const token = this.adminService.getToken();
        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          // Sử dụng mảng data trong yêu cầu HTTP
          const url = 'http://localhost:8080/v1/admin/thongketheonamthang?nam=' + nam +'&thang=' + thang;
          return this.http.get<any>(url, { headers });        }
      
        // Xử lý logic khi không có token
        return of(null);
      }
  }