import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DangNhap } from "../domain/DangNhap";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class AdminService {
    private REST_API_SERVER='http://localhost:8080/v1/khachhang';
    private REST_API_LOGIN='http://localhost:8080/v1/dangnhap';
    private httpOptions ={
        headers: new HttpHeaders({
          
          'Content-Type':'application/json',
          // 'Origin': 'http://localhost:4200' //  Thay localhost:4200 bằng domain của ứng dụng Angular của bạn
    
        }),
        
      };
      private tokenKey = 'authToken';
      private token: string;
    
      constructor(private http: HttpClient) { }
    
     public  dangNhap(dangNhap: DangNhap): Observable<any> {
        const url = `${this.REST_API_LOGIN}`;
        return this.http.post<any>(url, dangNhap)
          .pipe(
            tap(response => {
              this.token = response.token;
              localStorage.setItem(this.tokenKey, this.token);
            })
          );
      }
    
      getToken(): string | null {
        return this.token || localStorage.getItem(this.tokenKey);
      }
      xoaToken() {
        this.token = '';
        localStorage.removeItem(this.tokenKey);
      }


  }